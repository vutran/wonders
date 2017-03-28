const VNode = require('./vnode');

/**
 * JSX transformation function to create a virtual node.
 *
 * @param {String} nodeName
 * @param {Object} props
 * @param {...} args - List of children nodes
 * @return {Node}
 */
module.exports = function(nodeName, props, ...args) {
    const children = args.length ? [...args] : null;

    return new VNode(nodeName, props, children);
}
