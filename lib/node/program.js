const command = require('./command');

/**
 * Renders a program
 *
 * Filters and return the first matching command node.
 *
 * @param {Object} props
 * @param {Array<Node>} children - List of children nodes
 * @param {Object} args - CLI args
 */
module.exports = (props, children, args) => {
    const cmd = args._ && args._.length && args._[0];

    const matches = children.filter(c => c.props.name === cmd);

    if (matches.length) {
        return command(matches[0].props, matches[0].children, args._);
    }

    throw new Error('Command not found');
};

