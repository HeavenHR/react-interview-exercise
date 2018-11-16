## Usage

```
yarn install
yarn start
open http://localhost:3000
```

## Tasks

- Please add pagination support to the list when there are more than 2 entries
- Please add option to select sex of a friend male/female and display it
- Please add tests using your preferred testing tool (jest, mocha, should.js ...)

## Objectives

- You have received a working example so please do not upgrade any packages unless you really have to.
- Please check for small things like syntax errors, since details matter.
- Please deliver something that works, non working project is an automatic disqualification


## My Notes
- Used `prop-types` npm-packge instead of `React.PropTypes` to avoid this warning -> **Warning: Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead**.
- Testing tools used `chai, enzyme & sinon`.
- Added `enzyme-adapter-react-15` to support `enzyme` for `react@15.5.4` version, for more information [enzyme](https://github.com/airbnb/enzyme).
