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
    
    function JSONStatCategoryNode(config) {
        RED.nodes.createNode(this, config)
        this.dataset = Number(config.dataset)
        this.dimension = config.dimension || null;
        this.category = config.category || null;
        
        var node = this
        node.on('input', function(msg) {
            const stat = JSONstat(msg.payload)
            const dataset = stat.Dataset(node.dataset)

            let payload = {};

            if(this.category !== null) {
                payload = dataset.Dimension(node.dimension).Category(node.category)
            } else if(this.dimension !== null) {
                payload = dataset.Dimension(node.dimension)
            }

            node.send({
                ...msg,
                payload,
                updated: dataset.updated,
            })
            
        });
    }
    RED.nodes.registerType("jsonstat-category", JSONStatCategoryNode)
}
