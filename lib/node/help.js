const path = require('path');

module.exports = (props, children, args) => {
    const cmds = children.filter(child => child.nodeName === 'command');

    let str = '\n';

    str += 'Usage:\n';
    str += '\t' + path.basename(process.argv[1]) + ' [command] [options]\n';

    str += '\n';
    str += 'Commands:\n';

    // get the largest name size
    let maxLen = 0;
    for (let i = 0; i < cmds.length; i++) {
        if (cmds[i].props.name.length >= maxLen) {
            maxLen = cmds[i].props.name.length;
        }
    }

    cmds.forEach(cmd => {
        str += `\t${cmd.props.name}`;
        str += '\t\t';

        for (let i = 0; i < cmd.props.name - maxLen; i++) {
            str += ' ';
        }

        str += cmd.props.description;
        str += '\n';
    });

    return str;
};
