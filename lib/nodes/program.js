const command = require('./command');

/**
 * Renders a program
 *
 * Filters and return the first matching command node.
 *
 * @param {Object} props
 * @param {Array<VNode>} children - List of children nodes
 * @param {Object} args - CLI args
 * @return {Array<VNode>} - The rendered command
 */
module.exports = (props, children, args) => {
    const cmd = args._ && args._.length && args._[0];

    const matches = children.filter(c => c.props.name === cmd);

    if (matches.length) {
        return matches.map(
            match => command(match.props, match.children, args)
        );
    }

    throw new Error(`Command \`${cmd}\` not found.`);
};
