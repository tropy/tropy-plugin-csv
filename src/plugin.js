'use strict'

const { createWriteStream } = require('fs')
const { clipboard } = require('electron')
const { homedir } = require('os')
const { stringify } = require('csv-stringify/sync')

const TROPY = 'https://tropy.org/v1/tropy'

class CSVPlugin {
  constructor(options, context) {
    this.options = Object.assign({}, CSVPlugin.defaults, options)
    this.context = context
  }

  async getWriteStream() {
    if (this.options.clipboard) {
      return new ClipboardWriter()
    }

    let path = this.options.file

    if (!path) {
      path = await this.dialog.save({
        defaultPath: homedir()
      })
    }

    if (!path) return null

    return createWriteStream(path, {
      autoclose: true,
      flags: 'w'
    })
  }

  async expand(data) {
    return this.context.json.expand(data)
  }

  columns(itemTemplate, photoTemplate, item) {
    let c = itemTemplate.fields.map(f =>
      value(item[f.property]))

    if (this.options.tags)
      c.push(value(item[`${TROPY}#tag`], ', '))

    if (this.options.photoNotes || this.options.photoMetadata) {
      const allPhotos = list(item, `${TROPY}#photo`)
      for (const photo of allPhotos) {
        c.push(getPhotoPath(photo))
        if (this.options.photoMetadata)
          c.push(...photoTemplate.fields.map(
            f => value(photo[f.property])
          ))
        if (this.options.photoNotes)
          c.push(getNotes(photo))
      }
    } return c
  }

  columnsString(itemTemplate, photoTemplate, item) {
    return stringify([this.columns(itemTemplate, photoTemplate, item)], {
      quoted: this.options.quotes,
      quoted_empty: this.options.quotes,
      quoted_string: this.options.quotes
    })
  }

  header(itemTemplate, photoTemplate = null, maxPhotos = 1) {
    let h = itemTemplate.fields.map(f => f.property)
    if (this.options.tags) h.push(`${TROPY}#tag`)

    if (this.options.photoNotes || this.options.photoMetadata) {
      let photoHeaders = [`${TROPY}#path`]
      if (this.options.photoMetadata && photoTemplate) {
        photoHeaders.push(
          ...photoTemplate.fields.map(f => f.property))
      }
      if (this.options.photoNotes) { photoHeaders.push(`${TROPY}#note`) }

      [...Array(maxPhotos)].forEach(() => {
        h.push(...photoHeaders)
      })
    }

    return h
  }

  headerString(itemTemplate, photoTemplate = null, maxPhotos = 1) {
    return stringify([this.header(itemTemplate, photoTemplate, maxPhotos)], {
      quoted: this.options.quotes,
      quoted_empty: this.options.quotes,
      quoted_string: this.options.quotes
      })
    }

  loadExportTemplates(data) {
    const state = this.context.window.store?.getState()
    const inferredItemTemplate = data['@graph']?.[0]?.template
    const itemTemplate = loadTemplate(
      state,
      this.options.itemTemplate,
      inferredItemTemplate)
    if (!itemTemplate)
      throw new Error(
        `Failed to find specified item template "${this.options.itemTemplate}" or fallback "${data['@graph']?.[0]?.template}". Please install one of these templates, or select a different template and try again.`
      )

    const inferredPhotoTemplate = data['@graph']?.[0]?.photo?.[0]?.template
    const photoTemplate = this.options.photoMetadata ? loadTemplate(
      state,
      this.options.photoTemplate,
      inferredPhotoTemplate) : null
    if (this.options.photoMetadata && !photoTemplate)
      throw new Error(
        `Failed to find specified photo template "${this.options.photoTemplate}" or fallback "${data['@graph']?.[0]?.photo?.[0]?.template}". Please install one of these templates, or select a different template and try again.`
      )

    return { itemTemplate, photoTemplate }
  }

  maxPhotos(data) {
    return (this.options.photoMetadata || this.options.photoNotes) ?
      Math.max(...data['@graph'].map(item => item.photo?.length || 0)) : 0
  }

  async export(data) {
    this.logger.trace('Exporting items as CSV...')

    let ws = await this.getWriteStream()
    if (!ws || !data) return null

    const { itemTemplate, photoTemplate } = this.loadExportTemplates(data)

    ws.write(this.headerString(itemTemplate, photoTemplate,
      this.maxPhotos(data)))

    let xData = await this.expand(data)

    for (let g of xData) {
      for (let item of g['@graph']) {
        try {
          ws.write(this.columnsString(itemTemplate, photoTemplate, item))
        } catch (e) {
          this.logger.error({ stack: e.stack }, e.message)
        }
      }
    }

    ws.end()
  }

  async import() {
    this.logger.warn('CSV import not implemented yet.')
    console.warn('CSV import not implemented yet.')
  }

  get dialog() {
    return this.context.dialog
  }

  get logger() {
    return this.context.logger
  }
}

CSVPlugin.defaults = {
  clipboard: false,
  photoNotes: true,
  photoMetadata: false,
  quotes: true,
  tags: true,
  itemTemplate: '',
  photoTemplate: ''
}


class ClipboardWriter {
  constructor() {
    this.buffer = []
  }

  end() {
    clipboard.write({
      text: this.buffer.join('')
    })
  }

  write(string) {
    this.buffer.push(string)
  }
}

const list = (item, prop) => {
  try {
    return item[prop][0]['@list']
  } catch (_) {
    return []
  }
}

const value = (val, sep = ',') =>
    val ? val.map(v => v['@value']).join(sep) : null

const loadTemplate = (state, id1, id2) => {
  let t = state.ontology.template
  return t[id1] || t[id2]
}

module.exports = CSVPlugin
