const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const should = chai.should()
chai.use(sinonChai)
let sandbox = null

describe('Sample test with sandbox', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should verify that true is true', () => {
    true.should.equal(true)
  })
})
