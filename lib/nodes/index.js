const command = require('./command');
const help = require('./help');
const program = require('./program');
const version = require('./version');

// COM nodes
const div = require('./div');
const em = require('./em');
const p = require('./p');
const strong = require('./strong');
const u = require('./u');

module.exports = {
    command,
    help,
    program,
    version,

    // COM nodes
    div,
    em,
    p,
    strong,
    u,
};
