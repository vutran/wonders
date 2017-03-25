const minimist = require('minimist');
const command = require('./node/command');
const program = require('./node/program');

/**
 * Renders a composite node
 *
 * @param {Node} node
 * @param {Object} args - CLI args
 * @return {Node}
 */
const renderComposite = (node, args) => {
    const inputs = args._;

    if (!inputs.length) {
        throw new Error('Missing input.');
    }

    const component = node.nodeName;

    return renderTree(component(node.props));
};

/**
 * Renders a host node
 *
 * @param {Node} node
 * @param {Object} args - CLI args
 * @return {Node}
 */
const renderHost = (node, args) => {
    if (node.nodeName === 'program') {
        return program(node.props, node.children, args);
    }
};

/**
 * Recursively renders the node tree
 *
 * @param {Node} - A node to mount
 * @return {Object} - The node tree
 */
const renderTree = (node) => {
    const args = minimist(process.argv.slice(2));

    if (typeof node.nodeName === 'function') {
        return renderComposite(node, args);
    }

    if (typeof node.nodeName === 'string') {
        return renderHost(node, args);
    }
};

/**
 * Renders the program, and writes to the stream
 *
 * @param {Node} - A node to mount
 * @param {Stream} - A stream to write to such as process.stdout
 * @return {String}
 */
const render = (node, stream) => {
    const root = renderTree(node);

    if (root && stream) {
        Promise.resolve(root)
            .then(output => stream.write(output))
            .catch(err => stream.write(err));
    }
};

module.exports = render;
