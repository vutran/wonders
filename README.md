# Wonders

> A JavaScript library for building command-line applications with JSX.

**NOTE:** This framework is currently in it's initial stage of development and is still highly experimental. Not all features are yet to be implemented so please feel free to help contribute towards features, bugs, and documentations where necessary.

## Install

Install via npm or [yarn](https://yarnpkg.com)

```bash
$ npm i -S wonders

# or with yarn:

$ yarn add wonders
```

## Setup

Import `Wonders` in your files.

```js
import Wonders from 'wonders';

// Declare the JSX pragma
/** @jsx Wonders.Component */
```

Instead of declaring the JSX pragma in each file, it is recommended to install [`babel-preset-wonders`](https://www.npmjs.com/package/babel-preset-wonders) which includes all the necessary babel presets and plugins to get you started with `Wonders`.

```
{
    "presets": ["wonders"]
}
```

## Program Layout

A simple `<program/>` will consist of multiple `<commands/>`. These elements are handled internally by the renderer.

A simple structure would look something like this:

```jsx
const App = (
    <program version="1.0.0" args={process.argv}>
        <command name="foo">Foo!</command>
        <command name="bar">Bar!</command>
        <command name="baz">Baz!</command>
    </program>
);
```

The example above will only render and execute the `<command name="foo" />`.

```bash
$ ./cli.js foo

# -> Foo!
```

## Creating Your First Command Line Application

`Wonders` can render to any stream. For this example, we will be writing to `process.stdout` so our command-line application can work.

We will need to pass the argument list (from the user input) into the `<program />` element.

```jsx
#!/usr/bin/env node

// file: ./cli.js

import Wonders from 'wonders';

const App = (
    <program args={process.argv}>
        <command name="hello">
            Hello, World!
        </command>
    </program>
);

Wonders.render(<App />, process.stdout);
```

Running the script will result with:

```
$ ./cli.js hello

# -> Hello, World!
```

## Asynchronous Actions

`Wonders` supports for rendering output from asynchronous task. Suppose you want to write a script that would deploy something to a remote server. A simple example can be written like so:

```js
const deploy = () => {
    return new Promise((resolve) => {
        // perform remote server deployment
        setTimeout(() => {
            // resolve with a message once finished.
            resolve('Deployed!');
        }, 5000);
    });
};

const App = (
    <program args={process.argv}>
        <command name="deploy" onAction={deploy} />
    </program>
);

Wonders.render(<App />, process.stdout);
```

```bash
$ ./cli.js deploy

# .... waits 5 seconds
# -> Deployed!
```

## Functional and Class Components

`Wonders` follow the same patterns as [`React`](https://github.com/facebook/react) when building reusable components for your `<command/>`.

The most simplest way to write a component is to write a regular function.

```js
function beep() {
    return 'Beep!';
}
```

Or as an ES6 class:

```js
class Boop extends Wonders.Component {
    render() {
        return <p>Boop!</p>;
    }
}
```

You can feel free to compose your components, and stylize your output as necessary.

```js
import Wonders from 'wonders';

export function beep() {
    return (
        <div>
            <p><strong>This is bold text.</strong></p>
            <p><em>This is italicized text.</em></p>
            <p><u>This is underlined text.</u></p>
        </div>
    );
}
```

## Demo Application

See the codebase for a working demo application below:

[https://github.com/vutran/wonders-demo](https://github.com/vutran/wonders-demo)

## LICENSE

MIT © [Vu Tran](https://github.com/vutran/)
