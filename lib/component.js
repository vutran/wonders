const VNode = require('./vnode');
const { extend } = require('./utils');

/**
 * JSX transformation function to create a virtual node.
 *
 * @param {String} nodeName
 * @param {Object} props
 * @param {Array<VNode>} children - List of children nodes
 * @return {VNode}
 */
function Component(nodeName, props, ...children) {
    return new VNode(nodeName, props, children);
}

extend(Component.prototype, {
    isClassComponent: true,

    render() {},
});

module.exports = Component;
