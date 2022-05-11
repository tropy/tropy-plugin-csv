'use strict'

const assert = require('assert')

describe('CSVPlugin', () => {
  const CSVPlugin = require('../src/plugin')

  it('exists', () => {
    assert.equal(typeof CSVPlugin, 'function')
  })

  it('responds to export hook', () => {
    assert.equal(typeof (new CSVPlugin).export, 'function')
  })
  it('responds to import hook', () => {
    assert.equal(typeof (new CSVPlugin).import, 'function')
  })
})
