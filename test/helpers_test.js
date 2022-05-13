'use strict'

const assert = require('assert')
const { getNotes, getPhotoPath,
  value, splitArrayIntoChunks } = require('../src/helpers')
const { singlePhotoNoNote,
  singlePhotoSingleNote,
  singlePhotoManyNote } = require('./fixtures/photo')
const { itemNoPhoto } = require('./fixtures/item')

function getNoteFromPhotoFixture(photo, idx = 0) {
  return photo[0]['https://tropy.org/v1/tropy#note'][0]['@list'][idx]['https://tropy.org/v1/tropy#text'][0]['@value']
}


describe('Get photo notes', () => {
  it('returns an empty string when photo has no notes', () => {
    assert.equal(getNotes(singlePhotoNoNote[0]), '')
  })

  it('returns the note when a photo has a single note', () => {
    const extractedNote = getNotes(singlePhotoSingleNote[0])
    assert.equal(extractedNote,
      getNoteFromPhotoFixture(singlePhotoSingleNote, 0))
  })

  it('returns the text, not the markup, of a note', () => {
    const extractedNote = getNotes(singlePhotoSingleNote[0])
    assert.doesNotMatch(extractedNote, /<p>/)
  })

  it('concatenates the text of multiple notes using a separator', () => {
    const extractedNote = getNotes(singlePhotoManyNote[0])
    const firstNoteText = getNoteFromPhotoFixture(singlePhotoManyNote, 0)
    const secondNoteText = getNoteFromPhotoFixture(singlePhotoManyNote, 1)
    const sep = '---'
    assert.ok(extractedNote.includes(sep))
    assert.ok(extractedNote.includes(firstNoteText))
    assert.ok(extractedNote.includes(secondNoteText))
    assert.equal(extractedNote, `${firstNoteText} ${sep} ${secondNoteText}`)
  })
})

describe('Get photo path', () => {
  it('extracts the value from the #path key of a photo', () => {
    const expectedPath =
      singlePhotoNoNote[0]['https://tropy.org/v1/tropy#path'][0]['@value']
    assert.equal(getPhotoPath(singlePhotoNoNote[0]),
      expectedPath)
  })

  it('returns empty string if no value for path key', () => {
    const fixtureCopy = JSON.parse(JSON.stringify(singlePhotoNoNote))[0]
    delete fixtureCopy['https://tropy.org/v1/tropy#path'][0]['@value']
    assert.equal(getPhotoPath(fixtureCopy), '')
  })
  it('returns empty string if no path key present', () => {
    const fixtureCopy = JSON.parse(JSON.stringify(singlePhotoNoNote))[0]
    delete fixtureCopy['https://tropy.org/v1/tropy#path']
    assert.equal(getPhotoPath(fixtureCopy), '')

  })
})
describe('value', () => {
  it('extracts the value from the #path key of a photo', () => {
    const expectedValue =
      singlePhotoNoNote[0]['https://tropy.org/v1/tropy#path'][0]['@value']
    assert.equal(value(singlePhotoNoNote[0]['https://tropy.org/v1/tropy#path']),
      expectedValue)
  })

  it('concatenates values when there are multiple', () => {
    const expectedValue =
      itemNoPhoto['https://tropy.org/v1/tropy#tag']
    const actualValue = value(itemNoPhoto['https://tropy.org/v1/tropy#tag'])
    assert.ok(actualValue.startsWith(expectedValue[0]['@value']))
    assert.ok(actualValue.includes(expectedValue[1]['@value']))
  })
})


describe('split array into chunks', () => {
  const input = [1, 2, 3, 4, 5, 6]
  const chunkSize = 2
  const expected = [[1, 2], [3, 4], [5, 6]]
  const actual = splitArrayIntoChunks(input, chunkSize)
  it('splits an array into smaller arrays', () => {
    assert.ok(actual.every(x => (x.length < actual.length)))
  })
  it('all items in original array are included', () => {
    assert.deepEqual(actual, expected)
  })
  it('smaller arrays have specified size', () => {
    assert.ok(actual.every(x => (x.length === chunkSize)))
  })
  it('order of items is maintained', () => {
    assert.deepEqual(actual.flat(), input)
  })
})
