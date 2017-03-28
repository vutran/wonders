const VNode = require('./vnode');

/**
 * JSX transformation function to create a virtual node.
 *
 * @param {String} nodeName
 * @param {Object} props
 * @param {Array<VNode>} children - List of children nodes
 * @return {VNode}
 */
module.exports = function(nodeName, props, ...children) {
    return new VNode(nodeName, props, children);
};
