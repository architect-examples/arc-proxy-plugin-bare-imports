⚠️ *This repository has been archived. Use [@proxy](https://arc.codes/docs/en/reference/app.arc/proxy) or [asap](https://arc.codes/docs/en/reference/runtime/node.js#%40architect%2Fasap) for proxying in Architect. This plugin is not compatible with the [plugins](https://arc.codes/docs/en/guides/extend/plugins) API for Architect. For an updated list other examples refer to [arc.codes/examples](https://arc.codes/examples).*

# `@architect/proxy-plugin-bare-imports`

Loosely based on the nascent [import maps proposal for bringing bare imports to the browser](https://github.com/WICG/import-maps) this plugin allows `arc.proxy.public` assets have bare imports that resolve to web standards browser native esmodules URLs. 


## Install

```bash
cd src/http/get-index
npm i @architect/proxy-plugin-bare-imports
```

## Usage

Add the plugin to process the filetypes you're interested in (in this case `.mjs` files) and then add an `imports` section to the config to map bare values to URLs:

```javascript
// src/http/get-index/index.js
let arc = require('@architect/functions')

exports.handler = arc.proxy.public({
  plugins: {
    mjs: ['@architect/proxy-plugin-bare-imports']
  },
  imports: {
    'foo': '/vendor/foo.mjs',
    'preact': 'https://cdn.jsdelivr.net/npm/preact/dist/preact.mjs'
  }
})
```
