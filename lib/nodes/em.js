const PREFIX = '\u001b[3m';
const SUFFIX = '\u001b[0m';

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
