const PREFIX = '\n';
const SUFFIX = '';

module.exports = (props, children) => {
    // If a node has children: For each string node, add a prefix and suffix.
    if (children.length > 0) {
        return children.map(node => (typeof node === 'string' ? (PREFIX + node + SUFFIX) : node));
    }

    if (typeof children === 'string') {
        return PREFIX + children + SUFFIX;
    }

    // When there is no child, simply return.
    return [children];
};
