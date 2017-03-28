# Wonders

> Build command-line applications with JSX.

- [Basic demo](https://github.com/vutran/wonders-demo)

## Example

```js
#!/usr/bin/env node

import Wonders from 'wonders';

const echo = (args, options) => {
    return 'Echo: ' + options.message;
}

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
        <command name="echo" description="Echoes a message" onAction={echo} />
        <command name="deploy" description="Deploy an app" onAction={deploy} />
        <command name="beep" description="Prints Beep!" onAction={beep} />
        <command name="boop" description="Prints Boop!">Boop!</command>
    </program>
);

// render to the `stdout` stream
Wonders.render(<Program />, process.stdout);
```

```bash
$ ./cli.js echo foo

# Echo: foo

$ ./cli.js deploy

# Deployed!

$ ./cli.js beep

# Beep!

$ ./cli.js boop

# Boop!
```
