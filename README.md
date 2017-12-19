# IPFS Companion

![demo of v2.0.13](https://ipfs.io/ipfs/QmUxZrrjUGZVMjqc2noCRkQZr8B9JyGNj7sPpRoJ6uPQq1)

[![](https://img.shields.io/github/release/ipfs/ipfs-companion.svg)](https://github.com/ipfs/ipfs-companion/releases/latest)
[![](https://img.shields.io/badge/mozilla-full%20review-blue.svg)](https://addons.mozilla.org/en-US/firefox/addon/ipfs-companion/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-blue.svg)](http://standardjs.com/)
[![localization status](https://d322cqt584bo4o.cloudfront.net/ipfs-companion/localized.svg)](https://crowdin.com/project/ipfs-companion)
[![Coverage Status](https://coveralls.io/repos/github/lidel/ipfs-firefox-addon/badge.svg?branch=master)](https://coveralls.io/github/lidel/ipfs-firefox-addon?branch=master)
[![build-status](https://travis-ci.org/ipfs/ipfs-companion.svg?branch=master)](https://travis-ci.org/ipfs/ipfs-companion)

> Browser extension that simplifies access to IPFS resources

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Install](#install)
- [Contribute](#contribute)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Background

This add-on enables everyone to access IPFS resources the way they were meant: from locally running IPFS node :-)

IPFS is a new hypermedia distribution protocol, addressed by content and identities.
IPFS enables the creation of completely distributed applications.
It aims to make the web faster, safer, and more open.

Learn more at [ipfs.io](https://ipfs.io) (it is really cool, we promise!)

## Features

#### Automagical Detection of IPFS Resources

  Requests for resources at IPFS-like paths (`/ipfs/$cid` or `/ipns/$peerid_or_fqdn`) are detected on any website.  
  If tested path is a valid IPFS address it gets redirected and loaded from a local gateway, e.g:  
  `https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`  
  → `http://127.0.0.1:8080/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`

#### IPFS Status and Action Menu

- IPFS API and Gateway status
- Quick Upload of local files
- Easy access to [WebUI](https://github.com/ipfs/webui/) and add-on Preferences
- Toggle redirection to local gateway (automatic by default, manual mode can be enabled in Preferences)
- Additional actions for pages loaded from IPFS
    - Pin/Unpin of IPFS resources (via API)
    - Copy canonical IPFS address
    - Copy shareable URL to resource at preferred public gateway

#### Experiments!

_(some are disabled by default, use Preferences screen to enable)_

- Requests made via [experimental protocols](https://github.com/ipfs/ipfs-companion/issues/164) are re-routed to HTTP gateway (public or custom):
    - `ipns://$cid`
    - `ipns://$cid_or_fqdn`
    - `dweb:/ipfs/$cid`
    - `dweb:/ipns/$cid_or_fqdn`
- Detect domains with [dnslink](https://github.com/jbenet/go-dnslink) in DNS TXT record and load them from IPFS
- Make plaintext IPFS links clickable
- Mirror to IPFS by right click on any image or video

## Install

We recommend installing the add-on via your browser's add-on store.

| Firefox | Chrome / Chromium |
|---------|-------------------|
| [![Get the add-on](https://blog.mozilla.org/addons/files/2015/11/AMO-button_1.png)](https://addons.mozilla.org/en-US/firefox/addon/ipfs-companion/) | [![](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch) |

`ipfs-companion` is designed to retrieve content from a locally running IPFS daemon. so make sure [IPFS is installed](https://ipfs.io/docs/getting-started/) on your computer.

### Modern Firefox (> 53)

Install the latest signed release from [AMO](https://addons.mozilla.org/en-US/firefox/addon/ipfs-companion/).

It will guarantee automatic updates to the latest version reviewed by Mozilla community.

#### Legacy Firefox (< 53) and XUL-Compatible Browsers

Legacy  versions `1.x.x` were based on currently deprecated Add-On SDK (Firefox-only).   
While it is not maintained anymore, one can inspect, build and install it using codebase from [legacy-sdk](https://github.com/ipfs/ipfs-companion/tree/legacy-sdk) branch.    
For historical background on the rewrite see [Issue #20: Move to WebExtensions](https://github.com/ipfs/ipfs-companion/issues/20).

### Chrome / Chromium

Install the latest signed release from [Chrome Web Store](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch).


## Development or other Browsers Supporting WebExtensions API

Try manual installation:

1. Download Sources
2. Build it:

    ```bash
    npm install
    npm run build
    ```

3. Load it into browser:
    * Chromium-based
        1. Enter `chrome://extensions` in the URL bar
        2. Enable "Developer mode"
        3. Click "Load unpacked extension..." and point it at `add-on/manifest.json`
    * Firefox
        1. Enter `about:debugging` in the URL bar
        2. Click "Load Temporary Add-on" and point it at `add-on/manifest.json`

### Brave

`ipfs-companion` works in Brave. To try it out today you need to run brave from source, but we are working with Brave to get seamless IPFS support working out of the box. Track our progress [here](https://github.com/ipfs/ipfs-companion/issues/312)

- Configure your local ipfs gateway to run on port 9090 (_the default, port 8080, conflicts with the brave webpack dev server_)
- Clone and build `ipfs-companion` as above
- Clone [`brave/browser-laptop`](https://github.com/brave/browser-laptop)
- Symlink the `ipfs-companion/add-on` dir to `browser-laptop/app/extensions/ipfs`
- Add the following to `browser-laptop/app/extensions.js`
```js
  // Enable IPFS
  extensionInfo.setState('ipfs', extensionStates.REGISTERED)
  loadExtension('ipfs', getExtensionsPath('ipfs'), undefined, 'component')
```
https://github.com/ipfs-shipyard/browser-laptop/blob/66f38870fced0dbc55aae7fe1ed905bff602f88e/app/extensions.js#L500-L502
- In the `browser-laptop` project run `npm install` then in separate shells run `npm run watch` and `npm start`. If you have any trouble running Brave from source, check: https://github.com/brave/browser-laptop#installation

Brave will start up and you should see a badge with your number of connected ipfs peers next to the brave button, top right. (_the ipfs-companion badge currently doesn't appear [issue](https://github.com/brave/browser-laptop/issues/11797), [pr](https://github.com/brave/browser-laptop/pull/11143)_). Click on the badge and update your gateway settings to use port `9090`, then go share something with your peers...

![brave ipfs](https://user-images.githubusercontent.com/58871/34110877-e3080b0a-e3ff-11e7-8667-72fcef369386.gif)

### Enable Embedded IPFS Support via [js-ipfs](https://github.com/ipfs/js-ipfs)

We are testing out embedding an ipfs node in the add-on background page. It's hidden by default currently.

To enable it, edit the `package.json` file to remove...

```json
  "ipfs": false
```

...from the `browser` section and run `npm run build`. Note, don't set it to `true`, as that's not how the [browser module stubbing works](https://github.com/defunctzombie/package-browser-field-spec#ignore-a-module)

## Contribute

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/ipfs-companion/issues)!

If you want to help in developing this extension, please see [CONTRIBUTING](CONTRIBUTING.md) page :sparkles:

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### TROUBLESHOOTING

#### Upload via Right-Click Does Not Work in Firefox

See [this workaround](https://github.com/ipfs/ipfs-companion/issues/227).

#### Rule To Work with NoScript with ABE Enabled

By default [NoScript](https://addons.mozilla.org/en-US/firefox/addon/noscript/) breaks this addon by blocking assets loaded from IPFS Gateway running on localhost.    
To make it work, one needs to extend the SYSTEM Rulset and prepend it with IPFS whitelist:

```
# Enable IPFS redirect to LOCAL
Site ^http://127.0.0.1:8080/(ipfs|ipns)*
Anonymize

# Prevent Internet sites from requesting LAN resources.
Site LOCAL
Accept from LOCAL
Deny
```

Feel free to modify it, but get familiar with [ABE rule syntax](https://noscript.net/abe/abe_rules.pdf) first.

## License

[IPFS logo](https://github.com/ipfs/logo) belongs to [The IPFS Project](https://github.com/ipfs) and is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by-sa/3.0/legalcode">CC-BY-SA 3.0</a>.

[is-ipfs](https://github.com/xicombd/is-ipfs), [js-multihash](https://github.com/jbenet/js-multihash) and other NPM dependencies are under MIT license, unless stated otherwise.

The add-on itself is released under [CC0](LICENSE): to the extent possible under law, the author has waived all copyright and related or neighboring rights to this work, effectively placing it in the public domain.
