const command = require('./command');
const help = require('./help');
const program = require('./program');
const version = require('./version');

// COM nodes
const b = require('./b');
const br = require('./br');
const cite = require('./cite');
const div = require('./div');
const em = require('./em');
const i = require('./i');
const li = require('./li');
const p = require('./p');
const span = require('./span');
const strong = require('./strong');
const u = require('./u');
const ul = require('./ul');

module.exports = {
    command,
    help,
    program,
    version,

    // COM nodes
    b,
    br,
    cite,
    div,
    em,
    i,
    li,
    p,
    span,
    strong,
    u,
    ul,
};
