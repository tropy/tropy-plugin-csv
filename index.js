'use strict'

const { createWriteStream } = require('fs')
const { clipboard } = require('electron')
const { homedir } = require('os')

const TROPY = 'https://tropy.org/v1/tropy'

class CSVPlugin {
  constructor(options, context) {
    this.options = Object.assign({}, CSVPlugin.defaults, options)
    this.context = context
  }

  columns(itemTemplate, photoTemplate, item) {
    let c = itemTemplate.fields.map(f =>
      this.encode(value(item[f.property])))

    if (this.options.tags)
      c.push(this.encode(value(item[`${TROPY}#tag`], ', ')))

    if (this.options.photoNotes || this.options.photoMetadata) {
      const allPhotos = list(item, `${TROPY}#photo`)
      for (const photo of allPhotos) {
        c.push(this.encode(this.getPhotoPath(photo)))
        if (this.options.photoMetadata)
          c.push(...photoTemplate.fields.map(
            f => this.encode(value(photo[f.property]))
          ))
        if (this.options.photoNotes)
          c.push(this.encode(this.getNotes(photo)))
      }
    } return c
  }

  columnsString(itemTemplate, photoTemplate, item) {
    return this.columns(itemTemplate, photoTemplate, item).join(',')
  }

  getPhotoPath(photo) {
    return value(photo[`${TROPY}#path`])
  }

  getNotes(photo, sep = ' --- ') {
    return list(photo, `${TROPY}#note`)
      .map(x => value(x[`${TROPY}#text`]))
      .join(sep)
  }

  header(itemTemplate, photoTemplate = null, maxPhotos = 1) {
    let h = itemTemplate.fields.map(f => this.encode(f.property))
    if (this.options.tags) h.push(`${TROPY}#tag`)

    if (this.options.photoNotes || this.options.photoMetadata) {
      let photoHeaders = [`${TROPY}#path`]
      if (this.options.photoMetadata && photoTemplate) {
        photoHeaders.push(
          ...photoTemplate.fields.map(f => this.encode(f.property)))
      }
      if (this.options.photoNotes) { photoHeaders.push(`${TROPY}#note`) }

      [...Array(maxPhotos)].forEach(() => {
        h.push(...photoHeaders)
      })
    }

    return h
  }

  headerString(itemTemplate, photoTemplate = null, maxPhotos = 1) {
    return this.header(itemTemplate, photoTemplate, maxPhotos).join(',')
  }

  // TODO this isn't really RFC-4180 compliant
  // and probably has some unhandled edge cases
  encode(string) {
    return this.options.quotes ?
      `"${string == null ? '' : string.replaceAll(/"+/g, '""')}"` :
      `${string == null ? '' : string.replaceAll(/[,\n\r]/g, '')}`
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

    ws.write(`${this.headerString(itemTemplate, photoTemplate,
      this.maxPhotos(data))}\n`)

    let xData = await this.expand(data)

    for (let g of xData) {
      for (let item of g['@graph']) {
        try {
          ws.write(`${this.columnsString(itemTemplate, photoTemplate, item)}\n`)
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
