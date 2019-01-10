const should = require('should')
const helper = require('node-red-node-test-helper')
const dataNode = require('../nodes/jsonstat-data')
const example = require('./example')

helper.init(require.resolve('node-red'))

describe('jsonstat-data node', () => {

  beforeEach(done => helper.startServer(done))

  afterEach(done => {
    helper.unload()
    helper.stopServer(done)
  })

  it('should be loaded', done => {
    var flow = [{ id: 'n1', type: 'jsonstat-data', name: 'load test' }]
    helper.load(dataNode, flow, function () {
      var n1 = helper.getNode('n1')
      n1.should.have.property('name', 'load test')
      done()
    })
  })

  it('should init with dataset default 0', done => {
    var flow = [{ id: 'n1', type: 'jsonstat-data', name: 'init dataset test' }]
    helper.load(dataNode, flow, function () {
      var n1 = helper.getNode('n1')
      n1.should.have.property('dataset', 0)
      done()
    })
  })

  it('should parse jsonstat payload and extract data', done => {
    var flow = [
      {
        'id': 'njsonstat',
        'type': 'jsonstat-data',
        'dataset': 0,
        'data': '{"Tid": "2018M10", "NACE":"47", "ContentsCode": "VolumSesong"}',
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
    helper.load(dataNode, flow, () => {
      const njsonstat = helper.getNode('njsonstat')
      const nhelper = helper.getNode('nhelper')
      nhelper.on('input', msg => {
        msg.should.have.property('payload', { value: 102.3, status: null })
        done()
      })

      njsonstat.receive({ payload: example })
    })
  })

  it('should parse jsonstat payload and return correct updated date', done => {
    var flow = [
      {
        'id': 'njsonstat',
        'type': 'jsonstat-data',
        'dataset': 0,
        'data': '{"Tid": "2018M10", "NACE":"47", "ContentsCode": "VolumSesong"}',
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
    helper.load(dataNode, flow, () => {
      const njsonstat = helper.getNode('njsonstat')
      const nhelper = helper.getNode('nhelper')
      nhelper.on('input', msg => {
        msg.should.have.property('updated', '2019-01-10T19:25:00Z')
        done()
      })

      njsonstat.receive({ payload: example })
    })
  })
})
