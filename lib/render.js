const command = require('./node/command');
const program = require('./node/program');

/**
 * Renders the application and writes to the stream
 *
 * @param {Recon.Component}
 * @param {Stream} - A stream to write to such as process.stdout
 * @return {String}
 */
const render = (element, stream) => {
    let renderedElement;

    if (element.nodeName === 'program') {
        const output = program(element.props, element.children);

        if (output && stream) {
            Promise.resolve(output)
                .then(output => stream.write(output));
        }

        return output;
    }

    if (typeof element.nodeName === 'function') {
        const input = element.props && element.props.input;

        if (!input) {
            throw new Error('Missing input.');
        }

        const component = element.nodeName;

        renderedElement = component(element.props);
    }

    return render(renderedElement, stream);
};

module.exports = render;
