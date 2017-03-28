const path = require('path');
const { NEWLINE } = require('../constants');

module.exports = (props, children) => {
    let str = NEWLINE;

    str += 'Name: ' + path.basename(props.parse[1]) + NEWLINE;
    str += 'Version: ' + props.version;
    return str;
};
