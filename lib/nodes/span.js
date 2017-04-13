const PREFIX = '';
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

    return [PREFIX, c, SUFFIX];
};
