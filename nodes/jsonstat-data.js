module.exports = function (RED) {
  'use strict';
  const JSONstat = require('jsonstat')

  function JSONStatDataNode(config) {
    RED.nodes.createNode(this, config)
    this.dataset = isNaN(config.dataset) ? 0 : Number(config.dataset)
    this.data = config.data ? JSON.parse(config.data) : {}

    var node = this
    node.on('input', msg => {
      const stat = JSONstat(msg.payload)
      const dataset = stat.Dataset(node.dataset)
      node.send({
        ...msg,
        payload: dataset.Data(node.data),
        updated: dataset.updated,
      })
    });
  }
  RED.nodes.registerType('jsonstat-data', JSONStatDataNode)
}
