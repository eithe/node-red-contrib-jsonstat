/**
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <post  eirikh no> wrote this file.  As long as you retain this notice you
 * can do whatever you want with my stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Eirik H
 * ----------------------------------------------------------------------------
 */
module.exports = function(RED) {
    "use strict";
    const JSONstat = require('jsonstat')
    
    function JSONStatDataNode(config) {
        RED.nodes.createNode(this, config)
        this.dataset = isNaN(config.dataset) ? 0 : Number(config.dataset)
        this.data = config.data ? JSON.parse(config.data) : {}
        
        var node = this
        node.on('input', function(msg) {
            const stat = JSONstat(msg.payload)
            const dataset = stat.Dataset(node.dataset)
            node.send({
                ...msg,
                payload: dataset.Data(node.data),
                updated: dataset.updated,
            })
        });
    }
    RED.nodes.registerType("jsonstat-data",JSONStatDataNode)
}
