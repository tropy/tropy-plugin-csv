'use strict'

const assert = require('assert')
const { platform } = require('process')
const CSVPlugin = require('../src/plugin')
const TROPY = 'https://tropy.org/v1/tropy'

const itemHeaders = [
  'http://purl.org/dc/elements/1.1/date',
  'http://purl.org/dc/terms/title',
  `${TROPY}#tag`
]
const photoHeaders = [
  `${TROPY}#path`,
  `${TROPY}#note`
]
const rowNoPhoto = ['2022-01-02', 'title', '']
const rowNoTitle = ['2022-01-02', '', '']
const rowSinglePhoto = [
  '2022-01-03',
  'title1',
  'tag1, tag3',
  (platform === 'win32') ? 'D:\\user\\photo.jpg' : '/home/user/photo.jpg',
  '']
const rowManyPhoto = [
  '2022-01-04',
  'title2',
  'tag2',
  (platform === 'win32') ? 'D:\\user\\photo1.jpg' : '/home/user/photo1.jpg',
  'a note',
  (platform === 'win32') ? 'D:\\user\\photo2.jpg' : '/home/user/photo2.jpg',
  'some note --- another note, with a comma']

function generatePhoto(path, note = null, protocol = 'file') {
  const photo = {
    'https://tropy.org/v1/tropy#path': [{ '@value': path }],
    'https://tropy.org/v1/tropy#protocol': [{ '@value': protocol }]
  }
  if (note)
    photo[`${TROPY}#note`] = [{ '@list': [
      {
        '@type': [`${TROPY}#Note`],
        [`${TROPY}#html`]: [{ '@value': note }]
      }]
    }]
  return photo
}

function generateExpectedItem(date, title, photos = null) {
  return {
    'http://purl.org/dc/elements/1.1/date': [{ '@value': date }],
    'http://purl.org/dc/terms/title': [{ '@value': title }],
    'photo': photos ?
     [photos.map((path, note) => generatePhoto(path, note))] : []
  }
}

describe('Parse row', () => {
  const plugin = new CSVPlugin()
  it('Extracts item info to linked data format', () => {
    const actual = plugin.parseRow(rowNoPhoto, itemHeaders, photoHeaders)
    assert.deepEqual(actual, generateExpectedItem(rowNoPhoto[0], rowNoPhoto[1]))
  })
  it('Does not add key to item if value is empty in csv', () => {
    const actual = plugin.parseRow(rowNoTitle, itemHeaders, photoHeaders)
    assert.equal(actual['http://purl.org/dc/terms/title'], undefined)
    assert.ok(actual['http://purl.org/dc/elements/1.1/date'] !== undefined)
  })
  it('Item has no photos if no photo headers present', () => {
    const actual = plugin.parseRow(rowSinglePhoto, itemHeaders, undefined)
    assert.equal(actual['photo'], undefined)
  })
  it('Item has one photo if one photo present', () => {
    const actual = plugin.parseRow(rowSinglePhoto, itemHeaders, photoHeaders)
    assert.equal(actual.photo.length, 1)
    assert.deepEqual(actual['photo'],
      [generatePhoto(rowSinglePhoto[3], rowSinglePhoto[4])])
  })
  it('Item has multiple photos if multiple photos present', () => {
    const actual = plugin.parseRow(rowManyPhoto, itemHeaders, photoHeaders)
    assert.equal(actual.photo.length, 2)
    assert.deepEqual(actual['photo'][0],
      generatePhoto(rowManyPhoto[3], rowManyPhoto[4]))
  })
  it('Photo has no notes if notes not present in CSV', () => {
    const actual = plugin.parseRow(rowSinglePhoto, itemHeaders, photoHeaders)
    assert.equal(actual.photo.length, 1)
    assert.equal(actual['photo'][0][`${TROPY}#note`],
      undefined)
  })
  it('Photo notes in CSV are separated to multiple notes', () => {
    const actual = plugin.parseRow(rowManyPhoto, itemHeaders, photoHeaders)
    assert.equal(actual['photo'][1][`${TROPY}#note`][0]['@list'].length, 2)
  })
  it('List of tags for item in CSV is parsed to multiple tags', () => {
    const actual = plugin.parseRow(rowSinglePhoto, itemHeaders, photoHeaders)
    assert.equal(actual['https://tropy.org/v1/tropy#tag'][0].length, 2)
  })

})
describe('Parse row with template settings', function () {
  const pluginWithTemplates = new CSVPlugin({
    itemTemplate: 'https://tropy.org/v1/templates/correspondence',
    photoTemplate: 'https://tropy.org/v1/templates/photo'
  })
  const pluginNoTemplates = new CSVPlugin({
    itemTemplate: '',
    photoTemplate: ''
  })

  it('Does not add template to item if none specified in settings', () => {
    const actual = pluginNoTemplates.parseRow(rowSinglePhoto,
      itemHeaders, photoHeaders)
    assert.equal(actual[`${TROPY}#template`],
      undefined)
  })
  it('Does not add template to photos if none specified in settings', () => {
    const actual = pluginNoTemplates.parseRow(rowManyPhoto,
      itemHeaders, photoHeaders)
    assert.ok(actual.photo.every(p => p[`${TROPY}#template`] === undefined)
      )
  })
  it('Adds template to item if specified in settings', () => {
    const actual = pluginWithTemplates.parseRow(rowSinglePhoto,
      itemHeaders, photoHeaders)
    assert.equal(actual[`${TROPY}#template`][0]['@id'],
      'https://tropy.org/v1/templates/correspondence')
  })

  it('Adds template to photos if specified in settings', () => {
    const actual = pluginWithTemplates.parseRow(rowManyPhoto,
      itemHeaders, photoHeaders)
    assert.ok(actual.photo.every(p => p[`${TROPY}#template`][0]['@id'] ===
      'https://tropy.org/v1/templates/photo'))
  })
})
