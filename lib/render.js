const minimist = require('minimist');
const { NEWLINE } = require('./constants');
const VNode = require('./vnode');
const nodes = require('./nodes');
const component = require('./component');
const { extend, flatten, isClass } = require('./utils');

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
 * Renders a host node.
 *
 * Default command is set to "help".
 *
 * @param {VNode} node
 * @return {String|Promise} - The rendered node
 */
const renderHost = node => {
    if (node.nodeName === 'program') {
        const args = minimist(node.props.parse.splice(2));

        const cmd = args && args._.length ? args._[0] : 'help';

        const host = cmd in nodes ? nodes[cmd] : nodes.program;

        const renderedProgram = host(node.props, node.children, args);

        const flattened = flatten(walk(renderedProgram));
        let hasProm = false;
        for (let i = 0; i < flattened.length; i++) {
            if (flattened[i] && typeof flattened[i].then === 'function') {
                hasProm = true;
            }
        }

        // if `flattened` is at length 1, it could be a Promise
        // this is because there is a single `command.onAction` prop
        // if greater than 1, it should contain strings
        if (hasProm && flattened.length === 1) {
            return flattened[0];
        }

        return flattened.join('');
    }

    const host = nodes[node.nodeName];
    const renderedHost = host(node.props, node.children);
    if (Array.isArray(renderedHost)) {
        return flatten(walk(renderedHost)).join('');
    }
    return renderedHost;
};

/**
 * Recursively renders the node tree
 *
 * @param {VNode} - A node to mount
 * @return {VNode|String|Promise}
 */
const renderTree = node => {
    const nodeType = typeof node.nodeName;

    if (isClass(node.nodeName)) {
        const ctor = node.nodeName;
        const props = Object.assign({}, node.props, {
            children: node.children,
        });
        let inst = new ctor();
        inst = extend(ctor.prototype, { props }, inst);
        let renderedInstance = inst.render();
        if (!Array.isArray(renderedInstance)) {
            renderedInstance = [renderedInstance];
        }
        return flatten(renderedInstance.map(walk)).join('');
    }

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
 * @return {Promise}
 */
const render = (node, stream) => {
    if (!stream) {
        return Promise.reject(new Error('Missing stream in `Wonders.render()`'));
    }

    try {
        const root = renderTree(node);
        if (root) {
            return Promise.resolve(root)
                .then(output => {
                    let renderedOutput = output;
                    if (typeof output !== 'string') {
                        renderedOutput = renderTree(output);
                    }
                    stream.write(renderedOutput) && stream.write(NEWLINE);
                    return renderedOutput;
                })
                .catch(err => stream.write(err) && stream.write(NEWLINE));
        }
    } catch (err) {
        stream.write(err.message);
        stream.write(NEWLINE);
    }
};

/**
 * @param {Array<VNode|String>} children
 * @param {String} nodeName - Optional node name if children is a list
 * @return {Array<String>}
 */
const walk = (children, nodeName) => {
    if (typeof children === 'string') {
        return children;
    }

    if (typeof children.then === 'function') {
        return children;
    }

    if (Array.isArray(children)) {
        return children.map(walk);
    }

    if (children instanceof VNode) {
        if (isClass(children.nodeName)) {
            return renderTree(children);
        }

        const parentHost = nodes[children.nodeName];
        const renderedChildren = children.children.map(child => {
            if (typeof child === 'string') {
                return child;
            }

            if (isClass(child.nodeName)) {
                return renderTree(child);
            }

            const childHost = nodes[child.nodeName];
            const c = childHost(child.props, child.children);
            return walk(c);
        });
        const renderedParent = parentHost(children.props, renderedChildren);
        return renderedParent;
    }
};

module.exports = {
    renderComposite,
    renderHost,
    renderTree,
    render,
    walk,
};
