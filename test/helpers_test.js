'use strict'

const assert = require('assert')
const { getNotes, getPhotoPath,
  value, splitArrayIntoChunks, parseProtocol } = require('../src/helpers')
const { singlePhotoNoNote,
  singlePhotoSingleNote,
  singlePhotoManyNote,
  singleRemotePhotoNoNote,
  photoOnImportHttps,
  photoOnImportFileNoProtocol,
  photoOnImportWindowsFile,
  photoOnImportFileProtocol,
  photoOnImportWindowsFileRelative } = require('./fixtures/photo')
const { itemNoPhoto } = require('./fixtures/item')
const { cwd, platform } = require('process')
const path = require('path')

function getNoteFromPhotoFixture(photo, idx = 0) {
  return photo[0]['https://tropy.org/v1/tropy#note'][0]['@list'][idx]['https://tropy.org/v1/tropy#text'][0]['@value']
}

function getProtocolFromPhoto(photo) {
  return photo['https://tropy.org/v1/tropy#protocol']?.[0]['@value']
}
function getPathFromPhoto(photo) {
  return photo['https://tropy.org/v1/tropy#path'][0]['@value']
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

  it('prepends the protocol if not file', () => {
    const expectedProtocol = singleRemotePhotoNoNote[0]['https://tropy.org/v1/tropy#protocol'][0]['@value']
    assert.ok(getPhotoPath(singleRemotePhotoNoNote[0]).startsWith(`${expectedProtocol}://`))
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

describe('Parse protocol', () => {
  it('assigns https protocol when path is https url', () => {
    const inputPath = getPathFromPhoto(photoOnImportHttps)
    const parsed = parseProtocol(photoOnImportHttps)
    assert.equal(getProtocolFromPhoto(parsed), 'https')
    // it removes the protocol from the path
    assert.ok(!(getPathFromPhoto(parsed).startsWith('https://')))
    // and keeps all the parts of the URL
    assert.equal(getPathFromPhoto(parsed), inputPath.replace('https://', ''))
  })

  it('assigns file protocol when path is absolute filepath', () => {
    const photo = (platform === 'win32') ?
      photoOnImportWindowsFile : photoOnImportFileProtocol
    const inputPath = getPathFromPhoto(photo)
    const parsed = parseProtocol(photo)

    assert.equal(getProtocolFromPhoto(parsed), 'file')
    assert.ok(!(getPathFromPhoto(parsed).startsWith('file://')))
    assert.equal(getPathFromPhoto(parsed), inputPath.replace('file://', ''))
  })

  if (platform !== 'win32') {
    it('calculates absolute path when input is relative posix filepath', () => {
      const inputPath = getPathFromPhoto(photoOnImportFileNoProtocol)
      const csvDirectory = path.join(cwd(), 'test')
      const parsed = parseProtocol(photoOnImportFileNoProtocol, csvDirectory)

      assert.equal(getProtocolFromPhoto(parsed), 'file')

      // generated path is not relative
      assert.ok(!(getPathFromPhoto(parsed).startsWith('./')))
      // path includes the absolute path to the directory of the input CSV file
      assert.ok(getPathFromPhoto(parsed).startsWith(csvDirectory))
      // and the whole input path is carried through to the output path
      assert.ok(getPathFromPhoto(parsed).endsWith(inputPath.replace('./', '')))
    })
  } else {
    it('assigns file protocol when path is relative windows filepath', () => {
      const inputPath = getPathFromPhoto(photoOnImportWindowsFileRelative)
      const csvDirectory = path.join(cwd(), 'test')

      const parsed = parseProtocol(photoOnImportWindowsFileRelative,
        csvDirectory)

      assert.equal(getProtocolFromPhoto(parsed), 'file')
      // path starts with absolute path to the directory of the input CSV file
      assert.equal(
        getPathFromPhoto(parsed).slice(0, csvDirectory.length),
        csvDirectory
      )
      // and the whole input path is carried through to the output path
      assert.equal(
        getPathFromPhoto(parsed).slice(-1 * inputPath.length),
        inputPath
      )
    })
  }
})
