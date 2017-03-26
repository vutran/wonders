# recon

> Build command-line applications with JSX.

```js
#!/usr/bin/env node

import Recon from 'recon';

const search = () => {
    return new Promise((resolve) => {
        // perform async tasks...
        setTimeout(() => {
            resolve('Deployed!');
        }, 5000);
    });
}

const beep = () => {
    // just return a regular string
    return 'Beep!';
}

const Program = () => (
    <program>
        <command name="deploy" onAction={search} />
        <command name="beep" onAction={beep} />
        <command name="boop">Boop!</command>
    </program>
);

// render to the `stdout` stream
Recon.render(<Program />, process.stdout);
```

```bash
$ ./cli.js deploy

# Deployed!

$ ./cli.js beep

# Beep!

$ ./cli.js boop

# Boop!
```
