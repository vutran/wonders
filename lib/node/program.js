const command = require('./command');

/**
 * @param {Object} props
 * @param {Array<Node>} children - List of children nodes
 * @param {Array<String>} inputs - List of arguments
 */
module.exports = (props, children) => {
    // list of input arguments
    const inputs = props.input._;
    const cmd = inputs[0];

    const matches = children.filter(c => c.props.name === cmd);

    if (matches.length) {
        return command(matches[0].props, matches[0].children, inputs);
    }

    // @TODO: command not found?
};

