const should = require('should')
const helper = require('node-red-node-test-helper')
const categoryNode = require('../nodes/jsonstat-category')
const example = require('./example')

helper.init(require.resolve('node-red'))

describe('jsonstat-category node', () => {

  beforeEach(done => helper.startServer(done))

  afterEach(done => {
    helper.unload()
    helper.stopServer(done)
  })

  it('should be loaded', done => {
    var flow = [{ id: 'n1', type: 'jsonstat-category', name: 'load test' }]
    helper.load(categoryNode, flow, function () {
      var n1 = helper.getNode('n1')
      n1.should.have.property('name', 'load test')
      done()
    })
  })

  it('should init with dataset default 0', done => {
    var flow = [{ id: 'n1', type: 'jsonstat-category', name: 'init dataset test' }]
    helper.load(categoryNode, flow, () => {
      var n1 = helper.getNode('n1')
      n1.should.have.property('dataset', 0)
      done()
    })
  })

  it('should parse jsonstat payload and return a single category', done => {
    var flow = [
      {
        'id': 'njsonstat',
        'type': 'jsonstat-category',
        'dataset': 0,
        'dimension': 'Tid',
        'category': '2018M07',
        'wires': [
          [
            'nhelper'
          ]
        ]
      },
      {
        'id': 'nhelper',
        'type': 'helper'
      }
    ]
    helper.load(categoryNode, flow, () => {
      const njsonstat = helper.getNode('njsonstat')
      const nhelper = helper.getNode('nhelper')
      nhelper.on('input', msg => {
        msg.should.have.property('payload')
        msg.payload.should.have.property('index', 8)
        msg.payload.should.have.property('label', '2018M07')
        done()
      })

      njsonstat.receive({ payload: example })
    })
  })

  it('should parse jsonstat payload and return a category list', done => {
    var flow = [
      {
        'id': 'njsonstat',
        'type': 'jsonstat-category',
        'dataset': 0,
        'dimension': 'Tid',
        'category': '',
        'wires': [
          [
            'nhelper'
          ]
        ]
      },
      {
        'id': 'nhelper',
        'type': 'helper'
      }
    ]
    helper.load(categoryNode, flow, () => {
      const njsonstat = helper.getNode('njsonstat')
      const nhelper = helper.getNode('nhelper')
      nhelper.on('input', msg => {
        msg.should.have.property('payload')
        msg.payload.should.have.property('length', 13)
        msg.payload.should.have.property('label', 'month')
        done()
      })

      njsonstat.receive({ payload: example })
    })
  })

})
