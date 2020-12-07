'use strict'

const { createWriteStream } = require('fs')
const { clipboard, remote } = require('electron')

const TROPY = 'https://tropy.org/v1/tropy'

class CSVPlugin {
  constructor(options, context) {
    this.options = Object.assign({}, CSVPlugin.defaults, options)
    this.context = context
  }

  columns(template, item) {
    let c = template.fields.map(f =>
      this.encode(value(item[f.property])))

    if (this.options.tags)
      c.push(this.encode(value(item[`${TROPY}#tag`], ', ')))

    if (this.options.photos)
      c.push(this.encode(this.getPhotoPaths(item)))

    if (this.options.notes)
      c.push(this.encode(this.getPhotoNotes(item)))

    return c.join(',')
  }

  getPhotoPaths(item, sep = ';') {
    return list(item, `${TROPY}#photo`)
      .map(x => value(x[`${TROPY}#path`]))
      .join(sep)
  }

  getPhotoNotes(item, sep = '\n---\n') {
    return list(item, `${TROPY}#photo`)
      .flatMap(x => this.getNotes(x, sep))
      .filter(x => x != null && x.length > 0)
      .join(sep)
  }

  getNotes(photo, sep) {
    return list(photo, `${TROPY}#note`)
      .map(x => value(x[`${TROPY}#text`]))
      .join(sep)
  }

  header(template) {
    let h = template.fields.map(f => this.encode(f.property))

    if (this.options.tags) h.push('Tags')
    if (this.options.photos) h.push('Photos')
    if (this.options.notes) h.push('Notes')

    return h.join(',')
  }

  encode(string) {
    return this.options.quotes ?
      `"${string == null ? '' : string.replace(/"+/, '""')}"` :
      `${string == null ? '' : string.replace(/,/, '')}`
  }

  async getWriteStream() {
    if (this.options.clipboard) {
      return new ClipboardWriter()
    }

    let path = this.options.file

    if (!path) {
      path = await this.dialog.save({
        defaultPath: remote.app.getPath('home')
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

  async export(data) {
    this.logger.trace('Exporting items as CSV...')

    let ws = await this.getWriteStream()
    if (!ws || !data) return null

    let template = loadTemplate(
      this.context.window.store?.getState(),
      this.options.template,
      data['@graph']?.[0]?.template)

    if (this.options.header) {
      ws.write(`${this.header(template)}\n`)
    }

    let xData = await this.expand(data)

    for (let g of xData) {
      for (let item of g['@graph']) {
        try {
          ws.write(`${this.columns(template, item)}\n`)
        } catch (e) {
          this.logger.error({ stack: e.stack }, e.message)
        }
      }
    }

    ws.end()
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
  header: true,
  notes: true,
  photos: false,
  quotes: true,
  tags: true,
  template: '',
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
