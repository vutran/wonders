/**
 * @param {Object} props
 * @param {Array<Recon.Component> children
 * @param {Array<String} inputs - List of arguments
 */
const renderCommand = (props, children, inputs) => {
    if (typeof children === 'string') {
        return children;
    }

    if (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string') {
        return children[0];
    }

    // process action if it is available
    if (props.onAction) {
        return props.onAction.call(null, inputs);
    }

    console.log('unhandled children');
    return children;
};

const renderProgram = (props, children) => {
    // list of input arguments
    const inputs = props.input._;
    const cmd = inputs[0];

    const matches = children.filter(c => c.props.name === cmd);

    if (matches.length) {
        return renderCommand(matches[0].props, matches[0].children, inputs);
    }

    // @TODO: command not found?
};

/**
 * Renders the application and writes to the stream
 *
 * @param {Recon.Component}
 * @param {Stream} - A stream to write to such as process.stdout
 * @return {String}
 */
const render = (element, stream) => {
    let renderedElement;

    // if it's a program, render it!
    if (element.type === 'program') {
        const output = renderProgram(element.props, element.children);

        if (output && stream) {
            Promise.resolve(output)
                .then(output => stream.write(output));
        }

        return output;
    }

    if (typeof element.type === 'function') {
        const input = element.props && element.props.input;

        if (!input) {
            throw new Error('Missing input.');
        }

        const component = element.type;

        renderedElement = component(element.props);
    }

    return render(renderedElement, stream);
};

module.exports = render;
