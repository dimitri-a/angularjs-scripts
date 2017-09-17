<div align="center">
  <h1>Angularjs-scripts</h1>

  <strong>Scripts used to abstract frontend projects tooling (webpack, babel, etc.)</strong>

</div>

<hr>

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/dixeed/angularjs-scripts.svg?branch=master)](https://travis-ci.org/dixeed/angularjs-scripts)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)


## Disclaimer
**This project is made to be used in Dixeed's projects thus its configuration may not suit every needs.**

## Requirements
The projects using this script should meet some requirements in order for the scripts to work:

1. Have an `app` folder containing the project source code.
2. Node version >= 6.x

The script will build the project into a `dist` folder.

**It has only been tested with node 6.11.2 so far**

## Contributing
This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automatically handle semver bumps based on the commits messages.

To simplify commits messages redaction you can use `npm run cm` instead of `git commit`. To use that command make sure to `git add` your changes before.

This repo is configured to forbid commit messages that do not follow the [Angular conventional changelog commit message format](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit).

## Inspiration
This project is inspired by several other projects:
* Create React App: https://github.com/facebookincubator/create-react-app
* SKU: https://github.com/seek-oss/sku
* Kcd-scripts: https://github.com/kentcdodds/kcd-scripts

I'd like to thank the owners/contributors of these great projects for their work. It definitely helped implementing what we saught after.

## Webpack DLL benchmarks
| With DLL | Build | 1st dev reload | 2nd dev reload |
| -------- | ----- | -------------- | -------------- |
| No | 53156ms | 25595ms | 24511ms |
| Yes | 29373ms | 23126ms | 16551ms |
