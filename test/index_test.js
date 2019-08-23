'use strict'

const assert = require('assert')

describe('CSVPlugin', () => {
  const CSVPlugin = require('../index')

  it('exists', () => {
    assert.equal(typeof CSVPlugin, 'function')
  })

  it('responds to export hook', () => {
    assert.equal(typeof (new CSVPlugin).export, 'function')
  })
})
