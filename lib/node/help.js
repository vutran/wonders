const path = require('path');
const VNode = require('../vnode');

module.exports = (props, children) => {
    const cmds = children.filter(child => child.nodeName === 'command');

    cmds.push(new VNode('version', {
        name: 'version',
        description: 'Display the version',
    }));

    let str = '\n';

    str += 'Usage:\n';
    str += '\t' + path.basename(props.parse[1]) + ' [command] [options]\n';

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
