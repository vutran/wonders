const PREFIX = '\u2022';
const SUFFIX = '\n';

module.exports = (props, children) => {
    if (typeof children === 'string') {
        return PREFIX + children + SUFFIX;
    }

    return [PREFIX, children, SUFFIX];
};
