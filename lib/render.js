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

    return renderTree(component(node.props), args);
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
 * @param {Object} args - CLI args
 * @return {Object} - The node tree
 */
const renderTree = (node, args) => {
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
    const args = minimist(process.argv.slice(2));
    const root = renderTree(node, args);

    if (root && stream) {
        return Promise.resolve(root)
            .then(output => stream.write(output))
            .catch(err => stream.write(err));
    }

    return Promise.resolve();
};

module.exports = render;
