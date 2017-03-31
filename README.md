# Wonders

> Build command-line applications with JSX.

- [Basic demo](https://github.com/vutran/wonders-demo)

## Example

```js
#!/usr/bin/env node

import Wonders from 'wonders';

// can handle flags
const echo = (args, options) => {
    return 'Echo: ' + options.message;
}

// can return a Promise that resolves the output
const deploy = () => {
    return new Promise((resolve) => {
        // perform async tasks...
        setTimeout(() => {
            resolve('Deployed!');
        }, 5000);
    });
}

// works as pure fuctional components
const beep = () => {
    // just return a regular string
    return 'Beep!';
}

// works with ES6 classes
class Zap extends Wonders.Component {
    render() {
        return 'Zap!';
    }
}

const Program = () => (
    <program version="1.0.0" parse={process.argv}>
        <command name="echo" description="Echoes a message" onAction={echo} />
        <command name="deploy" description="Deploy an app" onAction={deploy} />
        <command name="beep" description="Prints Beep!" onAction={beep} />
        <command name="boop" description="Prints Boop!">Boop!</command>
        <command name="zap" description="Prints Zap!">
            <Zap />
        </command>
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

$ ./cli.js zap

# Zap!
```
