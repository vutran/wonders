const minimist = require('minimist');
const help = require('./node/help');
const version = require('./node/version');
const command = require('./node/command');
const program = require('./node/program');

/**
 * Renders a composite node
 *
 * @param {VNode} node
 * @return {VNode}
 */
const renderComposite = node => {
    const component = node.nodeName;
    return renderTree(component(node.props));
};

/**
 * Renders a host node
 *
 * @param {VNode} node
 * @return {String|Promise} - The rendered node
 */
const renderHost = node => {
    if (node.nodeName === 'program') {
        const args = minimist(node.props.parse.splice(2));

        if (!args._.length) {
            return help(node.props, node.children);
        }

        const cmd = args._[0];

        if (cmd === 'version') {
            return version(node.props, node.children);
        }

        return program(node.props, node.children, args);
    }
};

/**
 * Recursively renders the node tree
 *
 * @param {VNode} - A node to mount
 * @return {VNode|String|Promise}
 */
const renderTree = node => {
    const nodeType = typeof node.nodeName;

    if (nodeType === 'function') {
        return renderComposite(node);
    }

    if (nodeType === 'string') {
        return renderHost(node);
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
    try {
        const root = renderTree(node);

        if (root && stream) {
            return Promise.resolve(root)
                .then(output => stream.write(output) && stream.write('\n'))
                .catch(err => stream.write(err) && stream.write('\n'));
        }

        return Promise.resolve();
    } catch (err) {
        stream.write(err.message);
        stream.write('\n');
    }
};

module.exports = render;
