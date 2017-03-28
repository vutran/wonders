/**
 * Renders a command node.
 *
 * Reserved keywords
 * - name: string
 * - description: string
 * - onAction: function(args, options)
 *
 * @param {Object} props
 * @param {Array<Node>} children - List of children nodes
 * @param {Object} args - CLI args
 * @return {String|Promise} - The rendered command
 */
module.exports = (props, children, args) => {
    if (typeof children === 'string') {
        return children;
    }

    if (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string') {
        return children[0];
    }

    // process action if it is available
    if (props.onAction) {
        const options = {};
        for (let key in args) {
            if (key === '_') {
                continue;
            }
            options[key] = args[key];
        }

        return props.onAction.call(null, args._, options);
    }

    throw new Error('Missing action in command.');
};
