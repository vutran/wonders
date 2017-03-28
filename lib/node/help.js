const path = require('path');
const { NEWLINE, TAB } = require('../constants');
const VNode = require('../vnode');

module.exports = (props, children) => {
    const cmds = children.filter(child => child.nodeName === 'command');

    cmds.push(new VNode('version', {
        name: 'version',
        description: 'Display the version',
    }));

    let str = NEWLINE;

    str += 'Usage:' + NEWLINE;
    str += NEWLINE + path.basename(props.parse[1]) + ' [command] [options]' + NEWLINE;

    str += NEWLINE;
    str += 'Commands:' + NEWLINE;

    // get the largest name size
    let maxLen = 0;
    for (let i = 0; i < cmds.length; i++) {
        if (cmds[i].props.name.length >= maxLen) {
            maxLen = cmds[i].props.name.length;
        }
    }

    cmds.forEach(cmd => {
        str += TAB + cmd.props.name;
        str += TAB + TAB;

        for (let i = 0; i < cmd.props.name - maxLen; i++) {
            str += ' ';
        }

        str += cmd.props.description;
        str += NEWLINE;
    });

    return str;
};
