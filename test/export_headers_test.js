'use strict'

const assert = require('assert')
const CSVPlugin = require('../src/plugin')

describe('Generate header', () => {
  const { defaultItemTemplate,
    defaultPhotoTemplate } = require('./fixtures/template')
  const numDefaultItemFields = defaultItemTemplate.fields.length
  const numDefaultPhotoFields = defaultPhotoTemplate.fields.length

  describe('default case', () => {
    const defaultPlugin = new CSVPlugin({
      photoNotes: true,
      photoMetadata: false,
      tags: true,
      itemTemplate: '',
      photoTemplate: ''
    })
    const h = defaultPlugin.header(defaultItemTemplate,
      defaultPhotoTemplate)
    it('Generates at least as many column headers as the item template', () => {
      assert.ok(h.length >= numDefaultItemFields)
    })

    it('Generates at least as many column headers as both templates', () => {
      assert.ok(h.length >= numDefaultItemFields + numDefaultPhotoFields)
    })

    it('Generates column headers to match properties of item template', () => {
      const itemFields = defaultItemTemplate.fields.map(x => x.property)
      assert.deepEqual(h.slice(0, numDefaultItemFields), itemFields)
    })

    it('Generates at least 1 column for photo path', () => {
      assert.ok(h.slice(numDefaultItemFields).includes('https://tropy.org/v1/tropy#path'))
    })
  })

  describe('when tags is true', () => {
    const tagsPlugin = new CSVPlugin({
      tags: true,
      itemTemplate: ''
    })
    it('first header after item template fields is tags', () => {
      const h = tagsPlugin.header(defaultItemTemplate, defaultPhotoTemplate)
      assert.equal(h[numDefaultItemFields], 'https://tropy.org/v1/tropy#tag')
    })
  })

  describe('when quotes is true', () => {
    const quotesPlugin = new CSVPlugin({
      quotes: true,
      itemTemplate: ''
    })
    it('Header fields are quoted', () => {
      const h = quotesPlugin.headerString(
        defaultItemTemplate, defaultPhotoTemplate)
      assert.ok(h.includes('"'))
    })
  })
  describe('when quotes is false', () => {
    const noQuotesPlugin = new CSVPlugin({
      quotes: false,
      itemTemplate: ''
    })
    it('Header fields are not quoted', () => {
      const h = noQuotesPlugin.headerString(
        defaultItemTemplate, defaultPhotoTemplate)
      assert.ok(!h.includes('"'))
    })
  })

  describe('when tags is false', () => {
    const noTagsPlugin = new CSVPlugin({
      tags: false,
      itemTemplate: ''
    })
    it('first header after item template fields is not tags', () => {
      const h = noTagsPlugin.header(defaultItemTemplate, defaultPhotoTemplate)
      assert.notEqual(h[numDefaultItemFields], 'https://tropy.org/v1/tropy#tag')
    })
  })

  describe('when photo notes and metadata are false', () => {
    it('only item fields appear in header', () => {
      const noPhotosPlugin = new CSVPlugin({
        tags: false,
        photoNotes: false,
        photoMetadata: false,
        itemTemplate: ''
      })
      const h = noPhotosPlugin.header(defaultItemTemplate, defaultPhotoTemplate)
      const itemFields = defaultItemTemplate.fields.map(x => x.property)
      assert.deepEqual(h, itemFields)
    })

    it('only item fields appear even if photo template explicit', () => {
      const noPhotosPlugin = new CSVPlugin({
        tags: false,
        photoNotes: false,
        photoMetadata: false,
        itemTemplate: '',
        photoTemplate: defaultPhotoTemplate
      })
      const h = noPhotosPlugin.header(defaultItemTemplate, defaultPhotoTemplate)
      const itemFields = defaultItemTemplate.fields.map(x => x.property)
      assert.deepEqual(h, itemFields)
    })
  })

  describe('when just photo notes is true', () => {
    const photoNotesPlugin = new CSVPlugin({
      tags: false,
      photoNotes: true,
      photoMetadata: false,
      itemTemplate: ''
    })
    const h = photoNotesPlugin.header(defaultItemTemplate,
      defaultPhotoTemplate)
    it('photo path appears immediately after item fields in header', () => {
      assert.equal(h[numDefaultItemFields], 'https://tropy.org/v1/tropy#path')
    })

    it('photo notes appears immediately after photo path in header', () => {
      assert.equal(h[numDefaultItemFields + 1], 'https://tropy.org/v1/tropy#note')
    })
  })

  describe('when just photo metadata is true', () => {
    const photoMetaPlugin = new CSVPlugin({
      tags: false,
      photoNotes: false,
      photoMetadata: true,
      itemTemplate: ''
    })
    const h = photoMetaPlugin.header(defaultItemTemplate,
      defaultPhotoTemplate)
    it('photo path appears immediately after item fields in header', () => {
      assert.equal(h[numDefaultItemFields], 'https://tropy.org/v1/tropy#path')
    })

    it('photo metadata fields appear immediately after path in header', () => {
      const photoFields = defaultPhotoTemplate.fields
        .map(x => x.property)
      assert.deepEqual(h.slice(numDefaultItemFields + 1), photoFields)
    })

    it('photo notes field is absent', () => {
      assert.ok(!(h.slice(numDefaultItemFields + 1).includes('https://tropy.org/v1/tropy#note')))
    })
  })

  describe('when both photo metadata and notes are true', () => {
    const photoBothPlugin = new CSVPlugin({
      tags: false,
      photoNotes: true,
      photoMetadata: true,
      itemTemplate: ''
    })
    const h = photoBothPlugin.header(defaultItemTemplate,
      defaultPhotoTemplate)
    it('photo path appears immediately after item fields in header', () => {
      assert.equal(h[numDefaultItemFields], 'https://tropy.org/v1/tropy#path')
    })

    it('photo metadata fields appear immediately after path in header', () => {
      const photoFields = defaultPhotoTemplate.fields
        .map(x => x.property)
      assert.deepEqual(h.slice(numDefaultItemFields + 1, -1), photoFields)
    })

    it('photo notes field appears as last header', () => {
      assert.equal(h.slice(-1), 'https://tropy.org/v1/tropy#note')
    })
  })
})


describe('Get maximum number of photos in item', () => {
  const { data } = require('./fixtures/data')

  it('returns 0 if no photo output required', () => {
    const plugin = new CSVPlugin({ photoNotes: false, photoMeta: false })
    assert.equal(plugin.maxPhotos(data), 0)
  })
  it('returns the max number of photos in an item', () => {
    const plugin = new CSVPlugin({ photoNotes: true, photoMeta: false })
    assert.equal(plugin.maxPhotos(data), 4)
  })
})

