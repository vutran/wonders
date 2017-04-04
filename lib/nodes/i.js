const PREFIX = '\u001b[3m';
const SUFFIX = '\u001b[0m';

module.exports = (props, children) => {
    if (typeof children === 'string') {
        return PREFIX + children + SUFFIX;
    }

    return [PREFIX, children, SUFFIX];
};
