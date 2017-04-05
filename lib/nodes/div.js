const PREFIX = '\n';
const SUFFIX = '';

module.exports = (props, children) => {
    if (typeof children === 'string') {
        return PREFIX + children + SUFFIX;
    }

    return [PREFIX, children, SUFFIX];
};
