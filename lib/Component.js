module.exports = function(nodeName, props, ...args) {
    const children = args.length ? [...args] : null;

    return {
        type: nodeName,
        props,
        children,
    };
}
