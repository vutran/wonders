# Wonders

> Build command-line applications with JSX.

- [Basic demo](https://github.com/vutran/wonders-demo)

## Example

```js
#!/usr/bin/env node

import Wonders from 'wonders';

const deploy = () => {
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
        <command name="deploy" onAction={deploy} />
        <command name="beep" onAction={beep} />
        <command name="boop">Boop!</command>
    </program>
);

// render to the `stdout` stream
Wonders.render(<Program />, process.stdout);
```

```bash
$ ./cli.js deploy

# Deployed!

$ ./cli.js beep

# Beep!

$ ./cli.js boop

# Boop!
```
