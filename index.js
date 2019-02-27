'use strict'

const { createWriteStream } = require('fs')
const { clipboard, remote } = require('electron')
const { join } = require('path')

class CSVPlugin {
  constructor(options, context) {
    this.options = Object.assign({}, CSVPlugin.defaults, options)
    this.context = context
  }

  columns(item) {
    return this.options.columns
      .map(p => this.encode(first(item, p)))
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

    let path = await this.dialog.save({
      defaultPath: this.defaultPath
    })

    if (!path) return null

    return createWriteStream(path, {
      autoclose: true,
      flags: 'w'
    })
  }

  async export(data) {
    this.logger.info('Exporting items as CSV...', { options: this.options })

    let ws = await this.getWriteStream()
    if (!ws) return null

    if (this.options.header) {
      ws.write(`${this.header}\n`)
    }

    for (let items of data) {
      for (let item of items['@graph']) {
        try {
          ws.write(`${this.columns(item).join(',')}\n`)
        } catch (e) {
          this.logger.error(e.message)
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

  get header() {
    return this.options.columns
      .map(c => this.encode(c[0]))
      .join(',')
  }

  get logger() {
    return this.context.logger
  }
}

CSVPlugin.defaults = {
  clipboard: false,
  columns: [
    ['title'],
    ['author', 'crator'],
    ['recipient', 'audience'],
    ['date'],
    ['location', 'coverage'],
    ['type']
  ],
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

function first(item, props) {
  for (let key of props) {
    if (key in item) return item[key]
  }
}

module.exports = CSVPlugin
