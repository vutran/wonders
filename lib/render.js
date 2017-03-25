const renderCommand = (props, children) => {
    if (typeof children === 'string') {
        return children;
    }

    if (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string') {
        return children[0];
    }

    // process action if it is available
    if (props.onAction) {
        return props.onAction.call(null, props.name);
    }

    console.log('unhandled children');
    return children;
};

const renderProgram = (props, children) => {
    // find matching command
    const input = props.input;

    const matches = children.filter(c => c.props.name === input);

    if (matches.length) {
        // render the command
        return renderCommand(matches[0].props, matches[0].children);
    }

    // @TODO: command not found...
};

/**
 * Renders the application and applies the input
 *
 * @param {Recon.Component}
 * @return {String}
 */
const render = (element) => {
    let renderedElement;

    // if it's a program, render it!
    if (element.type === 'program') {
        return renderProgram(element.props, element.children);
    }

    if (typeof element.type === 'function') {
        const input = element.props && element.props.input;

        if (!input) {
            throw new Error('Missing input.');
        }

        const component = element.type;

        renderedElement = component(element.props);
    }

    return render(renderedElement);
};

module.exports = render;
