/**
 * @param {Object} props
 * @param {Array<Node>} children - List of children nodes
 * @param {Array<String>} inputs - List of arguments
 */
module.exports = (props, children, inputs) => {
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
