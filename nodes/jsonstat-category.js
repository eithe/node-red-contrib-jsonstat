module.exports = function (RED) {
  'use strict';
  const JSONstat = require('jsonstat')

  function JSONStatCategoryNode(config) {
    RED.nodes.createNode(this, config)
    this.dataset = isNaN(config.dataset) ? 0 : Number(config.dataset)
    this.dimension = config.dimension || null;
    this.category = config.category || null;

    var node = this
    node.on('input', msg => {
      const stat = JSONstat(msg.payload)
      const dataset = stat.Dataset(node.dataset)

      let payload = {};

      if (this.category !== null) {
        payload = dataset.Dimension(node.dimension).Category(node.category)
      } else if (this.dimension !== null) {
        payload = dataset.Dimension(node.dimension)
      }

      node.send({
        ...msg,
        payload,
        updated: dataset.updated,
      })

    });
  }
  RED.nodes.registerType('jsonstat-category', JSONStatCategoryNode)
}
