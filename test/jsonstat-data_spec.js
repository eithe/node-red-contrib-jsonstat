const should = require('should')
const helper = require('node-red-node-test-helper')
const dataNode = require('../nodes/jsonstat-data')
const httpReqNode = require('node-red/nodes/core/io/21-httprequest')

helper.init(require.resolve('node-red'))

describe('jsonstat-data node', function () {

  beforeEach(function (done) {
    helper.startServer(done);
  })

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  })

  it('should be loaded', function (done) {
    var flow = [{ id: 'n1', type: 'jsonstat-data', name: 'load test' }]
    helper.load(dataNode, flow, function () {
      var n1 = helper.getNode('n1')
      n1.should.have.property('name', 'load test')
      done()
    })
  })

  it('should init with dataset default 0', function (done) {
    var flow = [{ id: 'n1', type: 'jsonstat-data', name: 'init dataset test' }]
    helper.load(dataNode, flow, function () {
      var n1 = helper.getNode('n1')
      n1.should.have.property('dataset', 0)
      done()
    })
  })

  it('should parse jsonstat example and extract data', function (done) {
    var flow = [
      {
        "id": "nhttp",
        "type": "http request",
        "method": "GET",
        "ret": "obj",
        "url": "https://data.ssb.no/api/v0/dataset/1066.json?lang=en",
        "wires": [
            [
                "njsonstat"
            ]
        ]
      },
      {
        "id": "njsonstat",
        "type": "jsonstat-data",
        "dataset": 0,
        "data": "{\"Tid\":\"2018M10\",\"NACE\":\"47\",\"ContentsCode\":\"VolumSesong\"}",
        "wires": [
            [
                "nhelper"
            ]
        ]
      },
      {
        "id": "nhelper",
        "type": "helper"
      }
    ]
    helper.load(dataNode, flow, function () {
      const nhttp = helper.getNode('nhttp')
      const nhelper = helper.getNode('nhelper')
      nhelper.on('input', msg => {
        msg.should.have.property('payload', { value: 100 });
        done()
      })

      nhttp.receive({ payload:{} })
    })
  })
})