const should = require('should')
const helper = require('node-red-node-test-helper')
const categoryNode = require('../nodes/jsonstat-category')

helper.init(require.resolve('node-red'))

describe('jsonstat-category node', function () {

  beforeEach(function (done) {
    helper.startServer(done);
  })

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  })
  
  it('should be loaded', function (done) {
    var flow = [{ id: 'n1', type: 'jsonstat-category', name: 'load test' }]
    helper.load(categoryNode, flow, function () {
      var n1 = helper.getNode('n1')
      n1.should.have.property('name', 'load test')
      done()
    })
  })

  it('should init with dataset default 0', function (done) {
      var flow = [{ id: 'n1', type: 'jsonstat-category', name: 'init dataset test' }]
      helper.load(categoryNode, flow, function () {
        var n1 = helper.getNode('n1')
        n1.should.have.property('dataset', 0)
        done()
      })
    })
    
  })