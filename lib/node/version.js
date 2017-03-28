const path = require('path');

module.exports = (props, children) => {
    let str = '\n';

    str += 'Name: ' + path.basename(props.parse[1]) + '\n';
    str += 'Version: ' + props.version;
    return str;
};
