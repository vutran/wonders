const minimist = require('minimist');
const pkg = require('./package');
const Recon = require('./');

// actions
const getDescription = (props) => {
    return pkg.description;
};

const getVersion = (props) => {
    return pkg.version;
};


// creates the program
const Program = (props) => (
    <program input={props.input._[0]}>
        <command name="help" onAction={getDescription} />
        <command name="version" onAction={getVersion} />
    </program>
);

Recon.render(<Program input={minimist(process.argv.slice(2))} />, process.stdout);
