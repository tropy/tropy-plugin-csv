
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

const getPhotoPath = (photo) =>
  value(photo[`${TROPY}#path`]) || ''

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
  list, value, loadTemplate, getPhotoPath, getNotes,
  TROPY, addTemplateKey, splitArrayIntoChunks, createValue
}
