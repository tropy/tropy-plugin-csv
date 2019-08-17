'use strict'

const { createWriteStream } = require('fs')
const { clipboard, remote } = require('electron')
const { join } = require('path')

class CSVPlugin {
  constructor(options, context) {
    this.options = Object.assign({}, CSVPlugin.defaults, options)
    this.context = context
  }

  columns(template, item) {
    return template
      .fields
      .map(f => this.encode(this.value(item[f.property])))
  }

  header(template) {
    return template
      .fields
      .map(f => this.encode(f.property))
      .join(',')
  }


  encode(string) {
    return this.options.quotes ?
      `"${string == null ? '' : string.replace(/"+/, '""')}"` :
      `${string == null ? '' : string.replace(/,/, '')}`
  }

  value(value) {
    return value && value[0] && value[0]['@value']
  }

  async getWriteStream() {
    if (this.options.clipboard) {
      return new ClipboardWriter()
    }

    let path = await this.dialog.save({
      defaultPath: this.defaultPath
    })

    if (!path) return null

    return createWriteStream(path, {
      autoclose: true,
      flags: 'w'
    })
  }

  async expand(data) {
    return this.context.require('jsonld').expand(data)
  }

  async export(data) {
    this.logger.trace('Exporting items as CSV...')

    let ws = await this.getWriteStream()
    if (!ws || !data.length) return null

    let template = loadTemplate(data[0].template)

    if (this.options.header) {
      ws.write(`${this.header(template)}\n`)
    }

    let xData = await this.expand(data)

    for (let items of xData) {
      for (let item of items['@graph']) {
        try {
          ws.write(`${this.columns(template, item).join(',')}\n`)
        } catch (e) {
          this.logger.error({ stack: e.stack }, e.message)
        }
      }
    }

    ws.end()
  }

  get dialog() {
    return this.context.require('../dialog')
  }

  get defaultPath() {
    return join(
      remote.app.getPath('home'),
      this.options.file
    )
  }

  get logger() {
    return this.context.logger
  }
}

CSVPlugin.defaults = {
  clipboard: false,
  file: 'tropy.csv',
  header: false,
  quotes: true
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

const loadTemplate = id =>
  global.state.ontology.template[id]

module.exports = CSVPlugin
