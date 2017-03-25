/**
 * Base component
 *
 * @param {String} nodeName
 * @param {Object} props
 * @param {...} args - List of children nodes
 */
module.exports = function(nodeName, props, ...args) {
    const children = args.length ? [...args] : null;

    return { nodeName, props, children };
}
