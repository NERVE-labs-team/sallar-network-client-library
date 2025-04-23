# @sallar-network/client

## Description

Client-side library to communicate your program running on the sallar network with your backend server.

## Installation

```bash
Coming soon :)
```

## Build

You can build and test the library on your own:

```bash
$ npm run build
```

And add to your project:

```bash
# if you are using bundler

$ npm link
$ npm link @sallar-network/server
$ import { InstanceManager } from '@sallar-network/server'

# module js

import { InstanceManager } from './lib/index.mjs'

# `SallarNetworkClient` global object

<script src="/lib/index.global.js"></script>
```

## Example

`index.html`

```html
<!-- You have to include socket.io first -->
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>

<!-- The library -->
<script src="/lib/index.global.js"></script>

<!-- Your program -->
<script type="module" src="/program.js"></script>
```

`program.js`

```js
const program = new SallarNetworkClient.InstanceManager(io);

program.on('say-hello', (_, manager) => {
    manager.emit('hello');
});
```