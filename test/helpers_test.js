'use strict'

const assert = require('assert')
const CSVPlugin = require('../index')

describe('Encode', () => {
  describe('when quotes option is true', () => {
    const quotesCSV = new CSVPlugin({ quotes: true })

    it('returns an empty string in quotes when passed null', () => {
      assert.equal(quotesCSV.encode(null), '""')
    })

    it('returns the provided string inside double quotes', () => {
      assert.equal(quotesCSV.encode('an example string'), '"an example string"')
    })

    it('escapes existing double quotes in provided strings', () => {
      assert.equal(quotesCSV.encode('an "example" string'),
        '"an ""example"" string"')
    })
  })

  describe('when quotes option is false', () => {
    const noQuotesCSV = new CSVPlugin({ quotes: false })

    it('returns an empty string when passed null', () => {
      assert.equal(noQuotesCSV.encode(null), '')

    })

    it('passes through a string that doesn\'t contain comma unchanged', () => {
      assert.equal(noQuotesCSV.encode('a normal string'), 'a normal string')
    })

    it('strips the first comma from string', () => {
      assert.equal(noQuotesCSV.encode('1,000 things'), '1000 things')
    })

    it('strips all commas from string', () => {
      assert.equal(noQuotesCSV.encode('1,000 things, and mo,re'),
        '1000 things and more')
    })

    it('strips all newline characters from string', () => {
      assert.equal(noQuotesCSV.encode(`a string,
 with a line
 break`),
        'a string with a line break')
    })
  })

})

describe('Get photo notes', () => {
  const plugin = new CSVPlugin()
  const { singlePhotoNoNote,
    singlePhotoSingleNote,
    singlePhotoManyNote } = require('./fixtures/photo')

  it('returns an empty string when photo has no notes', () => {
    assert.equal(plugin.getNotes(singlePhotoNoNote[0]), '')
  })

  it('returns the note when a photo has a single note', () => {
    const extractedNote = plugin.getNotes(singlePhotoSingleNote[0])
    assert.equal(extractedNote, 'The Senate paused in its labor debate today.'
    )
  })

  it('returns the text, not the markup, of a note', () => {
    const extractedNote = plugin.getNotes(singlePhotoSingleNote[0])
    assert.doesNotMatch(extractedNote, /<p>/)
  })

  it('concatenates the text of multiple notes using a separator', () => {
    const extractedNote = plugin.getNotes(singlePhotoManyNote[0])
    const firstNoteText = 'NASA\'s Voyager mission took advantage of...'
    const secondNoteText = 'here’s a second note for this photo'
    const sep = '---'
    assert.ok(extractedNote.includes(sep))
    assert.ok(extractedNote.includes(firstNoteText))
    assert.ok(extractedNote.includes(secondNoteText))
    assert.equal(extractedNote, `${firstNoteText} ${sep} ${secondNoteText}`)
  })
})

describe('Get photo path', () => {
  const plugin = new CSVPlugin({ quotes: true })
  const { singlePhotoNoNote } = require('./fixtures/photo')

  it('extracts the value from the #path key of a photo', () => {
    assert.equal(plugin.getPhotoPath(singlePhotoNoNote[0]),
      '/home/caro/Downloads/ChapelHillWeekly.pdf')
  })

  it('returns empty string if no value for path key', () => {
    // TODO is this a possible state?
    delete singlePhotoNoNote[0]['https://tropy.org/v1/tropy#path'][0]['@value']
    assert.equal(plugin.getPhotoPath(singlePhotoNoNote[0]), '')

  })
  it('returns null if no path key present', () => {
    // TODO is this the desired behaviour or should this error?
    delete singlePhotoNoNote[0]['https://tropy.org/v1/tropy#path']
    assert.equal(plugin.getPhotoPath(singlePhotoNoNote[0]), null)
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

