'use strict'

const assert = require('assert')
const CSVPlugin = require('../src/plugin')

const headerNoPhoto = [
  'http://purl.org/dc/elements/1.1/date',
  'http://purl.org/dc/terms/source'
]

const headerWithPhoto = [
  'http://purl.org/dc/elements/1.1/date',
  'http://purl.org/dc/terms/source',
  'https://tropy.org/v1/tropy#path',
  'https://tropy.org/v1/tropy#note'
]

const headerRepeatedPhoto = [
  'http://purl.org/dc/elements/1.1/date',
  'http://purl.org/dc/terms/source',
  'https://tropy.org/v1/tropy#path',
  'https://tropy.org/v1/tropy#note',
  'https://tropy.org/v1/tropy#path',
  'https://tropy.org/v1/tropy#note'
]

describe('Parse header', () => {
  const plugin = new CSVPlugin()

  it('Extracts item headers when just item headers present', () => {
    const { itemHeaders, photoHeaders } = plugin.parseHeaders(headerNoPhoto)
    assert.deepEqual(itemHeaders, headerNoPhoto)
    assert.equal(photoHeaders, undefined)
  })
  it('Extracts item headers and photo headers when both present', () => {
    const { itemHeaders, photoHeaders } = plugin.parseHeaders(headerWithPhoto)
    assert.deepEqual(itemHeaders, headerWithPhoto.slice(0, 2))
    assert.deepEqual(photoHeaders, headerWithPhoto.slice(2))
  })
  it('Photo headers are after item headers, start with path', () => {
    const { photoHeaders } = plugin.parseHeaders(headerWithPhoto)
    assert.equal(photoHeaders[0], 'https://tropy.org/v1/tropy#path')
  })
  it('Extracts one copy of photo headers even when many present', () => {
    const { itemHeaders, photoHeaders } =
      plugin.parseHeaders(headerRepeatedPhoto)
    assert.deepEqual(itemHeaders, headerRepeatedPhoto.slice(0, 2))
    assert.deepEqual(photoHeaders, headerRepeatedPhoto.slice(2, 4))
    assert.deepEqual(photoHeaders, headerRepeatedPhoto.slice(4))
  })
})

