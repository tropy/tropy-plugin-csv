'use strict'

const assert = require('assert')
const CSVPlugin = require('../index')

describe('Generate csv row for item', () => {
  describe('with single photo', () => {
    const { defaultItemTemplate,
      defaultPhotoTemplate } = require('./fixtures/template')
    const numDefaultItemFields = defaultItemTemplate.fields.length
    const numDefaultPhotoFields = defaultPhotoTemplate.fields.length
    const { itemSinglePhoto,
      itemSinglePhotoExpected } = require('./fixtures/item')
    const expectedTags = itemSinglePhotoExpected.tags.join(' ')
    const expectedPath = itemSinglePhotoExpected.photoPath
    const expectedMetadata = [
      itemSinglePhotoExpected.photoTitle,
      itemSinglePhotoExpected.photoDate
    ]
    const expectedNote = itemSinglePhotoExpected.photoNote
    const expectedItem = [
      itemSinglePhotoExpected.title,
      itemSinglePhotoExpected.creator,
      itemSinglePhotoExpected.itemDate,
      itemSinglePhotoExpected.itemType,
      itemSinglePhotoExpected.source,
      itemSinglePhotoExpected.collection,
      itemSinglePhotoExpected.box,
      itemSinglePhotoExpected.folder,
      itemSinglePhotoExpected.identifier,
      itemSinglePhotoExpected.rights
    ].map(x => `"${x}"`)

    describe('with default settings', () => {
      const defaultPlugin = new CSVPlugin({
        photoNotes: true,
        photoMetadata: false,
        tags: true,
        quotes: true,
        itemTemplate: '',
        photoTemplate: ''
      })
      const c = defaultPlugin.columns(defaultItemTemplate,
        defaultPhotoTemplate, itemSinglePhoto)
      it('Generates at least as many columns as the item template', () => {
        assert.ok(c.length >= numDefaultItemFields)
      })

      it('Generates at least as many columns as both templates', () => {
        assert.ok(c.length >= numDefaultItemFields + numDefaultPhotoFields)
      })

      it('Selects the required information for the item template', () => {
        assert.deepEqual(c.slice(0, numDefaultItemFields), expectedItem)
      })

      it('Encloses strings in double quotes', () => {
        assert.ok(c[0].includes('"'))
      })
    })

    describe('with quotes false setting', () => {
      const plugin = new CSVPlugin({
        photoNotes: true,
        photoMetadata: false,
        tags: true,
        quotes: false,
        itemTemplate: '',
        photoTemplate: ''
      })
      const c = plugin.columns(defaultItemTemplate,
        defaultPhotoTemplate, itemSinglePhoto)

      it('does not quote values, and strips comma and newlines', () => {
        assert.deepEqual(c.slice(0, numDefaultItemFields),
          expectedItem.map(x => x.replaceAll(/[",\n\r]/g, '')))
      })
    })

    describe('when tags is true', () => {
      const tagsPlugin = new CSVPlugin({
        tags: true,
        quotes: false,
        itemTemplate: ''
      })

      it('first column after item template fields is tags', () => {
        const c = tagsPlugin.columns(defaultItemTemplate,
          defaultPhotoTemplate, itemSinglePhoto)
        assert.equal(c[numDefaultItemFields], expectedTags)
      })
    })

    describe('when tags is false', () => {
      const noTagsPlugin = new CSVPlugin({
        tags: false,
        quotes: false,
        itemTemplate: ''
      })

      it('first column after item template fields is not tags', () => {
        const c = noTagsPlugin.columns(defaultItemTemplate,
          defaultPhotoTemplate, itemSinglePhoto)
        assert.notEqual(c[numDefaultItemFields], expectedTags)
      })
    })

    describe('when photo notes and metadata are false', () => {
      it('only item columns are generated', () => {
        const noPhotosPlugin = new CSVPlugin({
          tags: false,
          photoNotes: false,
          photoMetadata: false,
          itemTemplate: ''
        })
        const c = noPhotosPlugin.columns(defaultItemTemplate,
          defaultPhotoTemplate, itemSinglePhoto)
        assert.equal(c.length, numDefaultItemFields)
      })

      it('only item columns generated even if photo template explicit', () => {
        const noPhotosPlugin = new CSVPlugin({
          tags: false,
          photoNotes: false,
          photoMetadata: false,
          itemTemplate: '',
          photoTemplate: defaultPhotoTemplate
        })
        const c = noPhotosPlugin.columns(defaultItemTemplate,
          defaultPhotoTemplate, itemSinglePhoto)
        assert.equal(c.length, numDefaultItemFields)
      })
    })

    describe('when just photo notes is true', () => {
      const photoNotesPlugin = new CSVPlugin({
        tags: false,
        photoNotes: true,
        photoMetadata: false,
        quotes: false,
        itemTemplate: ''
      })
      const c = photoNotesPlugin.columns(defaultItemTemplate,
        defaultPhotoTemplate, itemSinglePhoto)

      it('photo path appears immediately after item fields', () => {
        assert.equal(c[numDefaultItemFields],
          expectedPath)
      })

      it('photo notes appears immediately after photo path', () => {
        assert.equal(c[numDefaultItemFields + 1],
          expectedNote)
      })
    })

    describe('when just photo metadata is true', () => {
      const photoMetaPlugin = new CSVPlugin({
        tags: false,
        photoNotes: false,
        photoMetadata: true,
        quotes: false,
        itemTemplate: ''
      })
      const c = photoMetaPlugin.columns(defaultItemTemplate,
        defaultPhotoTemplate, itemSinglePhoto)

      it('photo path appears immediately after item fields', () => {
        assert.equal(c[numDefaultItemFields],
          expectedPath)
      })

      it('photo metadata fields appear immediately after path', () => {
        assert.deepEqual(c.slice(numDefaultItemFields + 1), expectedMetadata)
      })

      it('photo notes field is absent', () => {
        assert.ok(!(c.slice(numDefaultItemFields + 1)
          .includes(expectedNote)))
      })
    })

    describe('when both photo metadata and notes are true', () => {
      const photoBothPlugin = new CSVPlugin({
        tags: false,
        photoNotes: true,
        photoMetadata: true,
        quotes: false,
        itemTemplate: ''
      })
      const c = photoBothPlugin.columns(defaultItemTemplate,
        defaultPhotoTemplate, itemSinglePhoto)

      it('photo path appears immediately after item fields', () => {
        assert.equal(c[numDefaultItemFields], expectedPath)
      })

      it('photo metadata fields appear immediately after path ', () => {
        assert.deepEqual(c.slice(numDefaultItemFields + 1, -1),
          expectedMetadata)
      })

      it('photo notes field appears as last column', () => {
        assert.equal(c.slice(-1), expectedNote)
      })
    })
  })


  describe('with single photo with many notes', () => {
    const { defaultItemTemplate,
      defaultPhotoTemplate } = require('./fixtures/template')
    const numDefaultItemFields = defaultItemTemplate.fields.length
    const { itemSinglePhotoManyNote,
      itemManyNoteExpected } = require('./fixtures/item')

    const photoNotesPlugin = new CSVPlugin({
      tags: false,
      photoNotes: true,
      photoMetadata: false,
      quotes: false,
      itemTemplate: ''
    })
    const c = photoNotesPlugin.columns(defaultItemTemplate,
      defaultPhotoTemplate, itemSinglePhotoManyNote)

    it('photo notes column appears immediately after photo path', () => {
      assert.ok(c[numDefaultItemFields + 1].startsWith(
        itemManyNoteExpected.firstNote
      ))
    })

    it('all photo notes appear in column', () => {
      assert.ok(c[numDefaultItemFields + 1].includes(
        itemManyNoteExpected.firstNote))
      assert.ok(c[numDefaultItemFields + 1].includes(
        itemManyNoteExpected.secondNote))
    })
  })

  describe('with no photo but photo info requested', () => {
    const { defaultItemTemplate,
      defaultPhotoTemplate } = require('./fixtures/template')
    const numDefaultItemFields = defaultItemTemplate.fields.length
    const { itemNoPhoto } = require('./fixtures/item')
    const photoNotesPlugin = new CSVPlugin({
      tags: false,
      photoNotes: true,
      photoMetadata: true,
      quotes: false,
      itemTemplate: ''
    })
    const c = photoNotesPlugin.columns(defaultItemTemplate,
      defaultPhotoTemplate, itemNoPhoto)

    it('only has columns for item fields', () => {
      assert.equal(c.length, numDefaultItemFields)
    })
  })


  describe('with many photos', () => {
    const { defaultItemTemplate,
      defaultPhotoTemplate } = require('./fixtures/template')
    const numDefaultItemFields = defaultItemTemplate.fields.length
    const { itemManyPhoto, itemManyPhotoExpected } = require('./fixtures/item')
    const plugin = new CSVPlugin({
      tags: false,
      photoNotes: true,
      photoMetadata: true,
      quotes: false,
      itemTemplate: ''
    })
    const c = plugin.columns(defaultItemTemplate,
      defaultPhotoTemplate, itemManyPhoto)

    it('has enough columns for all photo data', () => {
      const numPhotos = 3
      const numDefaultPhotoFields = defaultPhotoTemplate.fields.length
      const numActualPhotoFields = numDefaultPhotoFields + 2 // path and notes
      assert.equal(c.length,
        numDefaultItemFields + (numPhotos * numActualPhotoFields))
    })

    it('has path of first photo in first column after item data', () => {
      assert.equal(c[numDefaultItemFields],
        itemManyPhotoExpected.firstPhotoPath)
    })

    it('has notes of last photo in last column', () => {
      assert.equal(c.slice(-1), itemManyPhotoExpected.lastPhotoNote)
    })
  })
})
