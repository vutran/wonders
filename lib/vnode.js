/**
 * Creates and return a virtual node
 *
 * @param {string|Function} nodeName
 * @param {Object<string>} props
 * @param {Array<VNode>} children
 * @return {VNode}
 */
module.exports = function VNode(nodeName, props, children) {
    this.nodeName = nodeName;

    this.props = props || {};

    this.children = children || [];
};
