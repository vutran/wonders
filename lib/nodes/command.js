/**
 * Renders a command node.
 *
 * Reserved keywords
 * - name: string
 * - description: string
 * - onAction: function(args, options)
 *
 * @param {Object} props
 * @param {Array<VNode>} children - List of children nodes
 * @param {Object} args - CLI args
 * @return {String|Promise|Array<VNode>} - The rendered command
 */
module.exports = (props, children, args) => {
    const ct = typeof children;
    let c = children;

    if (ct === 'number' || ct === 'boolean') {
        c = c.toString();
    }

    if (typeof c === 'string') {
        return c;
    }

    if (Array.isArray(c) && c.length) {
        return c;
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
