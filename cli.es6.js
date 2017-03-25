const https = require('https');
const minimist = require('minimist');
const pkg = require('./package');
const Recon = require('./');

// helpers
const searchRepo = (q) => new Promise((resolve, reject) => {
    const url = `https://api.github.com/search/repositories?q=${q}`;
    const opts = {
        headers: {
            'User-Agent': 'recon-demo',
        },
        hostname: 'api.github.com',
        path: `/search/repositories?q=${q}`,
    };
    https.get(opts, res => {
        let data = '';
        res
            .on('data', d => {
                data += d;
            })
            .on('end', () => {
                let d = JSON.parse(data);
                resolve(d);
            });
    });
});


// search
const search = (args) => {
    const q = args[1];
    return searchRepo(q)
        .then(res => res.items.map(item => item.full_name))
        .then(repos => {
            let log = 'Found: \n';
            log += repos.join('\n');
            return log;
        });
}

// creates the program
const Program = (props) => (
    <program input={props.input}>
        <command name="search" onAction={search} />
    </program>
);

Recon.render(<Program input={minimist(process.argv.slice(2))} />, process.stdout);
