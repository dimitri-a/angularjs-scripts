<div align="center">
  <h1>Angularjs-scripts</h1>

  <strong>Scripts used to abstract frontend projects tooling (webpack, babel, etc.)</strong>

</div>

<hr>

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Disclaimer
**This project is made to be used in Dixeed's projects thus its configuration may not suit every needs.**

## Requirements
The projects using this script should meet some requirements in order for the scripts to work:

1. Have an `app` folder containing the project source code.
2. Node version >= 4.x

The script will build the project into a `dist` folder.

**It has only been tested with node 6.11.2 so far**

## Inspiration
This project is inspired by several other projects:
* Create React App: https://github.com/facebookincubator/create-react-app
* SKU: https://github.com/seek-oss/sku
* Kcd-scripts: https://github.com/kentcdodds/kcd-scripts

I'd like to thank the owners/contributors of these great projects for their work. It definitely helped implementing what we saught after.

### Webpack DLL benchmarks
build without DLL: 53156ms
first rebuild with devserver: 25595ms
second rebuild: 24511ms

first build with DLL creation: 29373ms
second build without dll creation: 23126ms
first rebuild with dll: 16551ms
