const path = require('path');
const { NEWLINE, TAB } = require('../constants');
const component = require('../component');

module.exports = (props, children) => {
    const cmds = children.filter(child => child.nodeName === 'command');

    cmds.push(
        component('version', {
            name: 'version',
            description: 'Display the version',
        }),
    );

    let str = NEWLINE;

    str += 'Usage:' + NEWLINE;
    str += NEWLINE + TAB + path.basename(props.parse[1]) + ' [command] [options]' + NEWLINE;

    str += NEWLINE;
    str += 'Commands:' + NEWLINE;

    // get the largest command name size
    // also count the number of instances of a command
    let maxLen = 0;
    let cmdUseCount = {};
    for (let i = 0; i < cmds.length; i++) {
        const cmdName = cmds[i].props.name;

        if (cmdName.length >= maxLen) {
            maxLen = cmds[i].props.name.length;
        }

        cmdUseCount[cmdName] ? cmdUseCount[cmdName] += 1 : cmdUseCount[cmdName] = 1;
    }

    cmds.forEach(cmd => {
        const hasMulti = cmdUseCount[cmd.props.name] > 1; 

        // If cmd has multiple instances, start color text
        if (hasMulti) { 
            str += "\x1b[1m"; 
        }

        str += TAB + cmd.props.name;
        str += ' '.repeat(maxLen - cmd.props.name.length);
        str += TAB + TAB;
        str += cmd.props.description;
        
        // If cmd has multiple instances, end color text
        if (hasMulti) {
            str += "\x1b[0m";
        }

        str += NEWLINE;
    });

    return str;
};
