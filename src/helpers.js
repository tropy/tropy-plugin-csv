const { resolve } = require('path')
const { URL, pathToFileURL, fileURLToPath } = require('url')

const TROPY = 'https://tropy.org/v1/tropy'

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

const getPhotoPath = (photo) => {
  let path = value(photo[`${TROPY}#path`])
  if (!path) return ''
  const protocol = value(photo[`${TROPY}#protocol`])
  return (protocol === 'file') ? path : `${protocol}://` + path
}

const getNotes = (photo, sep = ' --- ') =>
  list(photo, `${TROPY}#note`)
    .map(x => value(x[`${TROPY}#text`]))
    .join(sep)

const createNoteValue = (k, v, sep = ' --- ') => {
  const note = v.split(sep).map(
    val => ({
      '@type': [
        `${TROPY}#Note`
      ],
      'https://tropy.org/v1/tropy#html': [
        {
          '@value': val
        }]
    }))
  return { [k]: [{ '@list': note }] }
}

const createValue = (k, v) => {
  if (!v) return
  switch (k) {
    case (`${TROPY}#note`):
      return createNoteValue(k, v)

    // because tags field text is comma separated list of tags
    case (`${TROPY}#tag`):
      return { [k]: [v.split(', ').map(val => ({ '@value': val }))] }

    default:
      return { [k]: [{ '@value': v }] }
  }
}

function argToURL(path, relativeTo = process.cwd()) {
  // Subtle: only try to parse arguments as URLs for supported protocols,
  // otherwise win32 paths with drive letters may get interpreted as URLs.
  if (!(/^(file|https?):/i).test(path))
    return pathToFileURL(resolve(relativeTo, path))
  try {
    return new URL(path)
  } catch (e) {
    if (e.code !== 'ERR_INVALID_URL')
      throw e

    return pathToFileURL(resolve(relativeTo, path))
  }
}

function getProtocolAndPath(path, relativeTo) {
  const url = argToURL(path, relativeTo)
  if (url.protocol === 'file:') {
    return {
      path: fileURLToPath(url.href),
      protocol: 'file'
    }
  } else {
    return {
      path: url.href.replace((/^https?:\/\//i), ''), // remove the protocol
      protocol: url.protocol.replace(':', '')
    }
  }
}
const parseProtocol = (photo, baseDirectory) => {
  const rawPath = photo[`${TROPY}#path`][0]['@value']
  const { protocol, path } = getProtocolAndPath(rawPath, baseDirectory)
  photo[`${TROPY}#path`][0]['@value'] = path
  Object.assign(photo, createValue(`${TROPY}#protocol`, protocol))
  return photo
}

const addTemplateKey = (x, templateId) => {
  if (templateId) {
    x[`${TROPY}#template`] = [{ '@id': templateId }]
  }
  return x
}

const splitArrayIntoChunks = (arr, chunkSize) => {
  let chunks = []
  let i = 0
  const n = arr.length
  while (i < n) {
    chunks.push(arr.slice(i, i += chunkSize))
  }
  return chunks
}

module.exports = {
  list,
  value,
  loadTemplate,
  getPhotoPath,
  getNotes,
  TROPY,
  addTemplateKey,
  splitArrayIntoChunks,
  createValue,
  parseProtocol
}
