const minimist = require('minimist');
const help = require('./node/help');
const command = require('./node/command');
const program = require('./node/program');

/**
 * Renders a composite node
 *
 * @param {VNode} node
 * @param {Object} args - CLI args
 * @return {VNode}
 */
const renderComposite = (node, args) => {
    const inputs = args._;

    const component = node.nodeName;

    return renderTree(component(node.props), args);
};

/**
 * Renders a host node
 *
 * @param {VNode} node
 * @param {Object} args - CLI args
 * @return {String|Promise} - The rendered node
 */
const renderHost = (node, args) => {
    if (node.nodeName === 'program') {
        if (!args._.length) {
            return help(node.props, node.children, args);
        }

        return program(node.props, node.children, args);
    }
};

/**
 * Recursively renders the node tree
 *
 * @param {VNode} - A node to mount
 * @param {Object} args - CLI args
 * @return {VNode|String|Promise}
 */
const renderTree = (node, args) => {
    const nodeType = typeof node.nodeName;

    if (nodeType === 'function') {
        return renderComposite(node, args);
    }

    if (nodeType === 'string') {
        return renderHost(node, args);
    }
};

/**
 * Renders the program, and writes to the stream
 *
 * @param {VNode} - A node to mount
 * @param {Stream} - A stream to write to such as process.stdout
 * @return {String|Promise}
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
