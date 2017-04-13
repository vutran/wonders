const PREFIX = '\n';
const SUFFIX = '';

module.exports = (props, children) => {
    const tc = typeof children;
    let c = children;

    if (tc === 'number' || tc === 'boolean') {
        c = c.toString();
    }

    if (typeof c === 'string') {
        return PREFIX + c + SUFFIX;
    }

    // If a node has children: For each literal node, add a prefix and suffix.
    if (Array.isArray(c) && c.length > 0) {
        return c.map(node => {
            const nt = typeof node;
            let n = node;

            if (nt === 'number' || nt === 'boolean') {
                n = n.toString();
            }

            if (typeof n === 'string') {
                return PREFIX + n + SUFFIX;
            }

            return n;
        });
    }

    // When there is no child, simply return.
    return [c];
};
