**totally** - a cli for fetching test data and tracking data contracts

http://npmjs.org/totally

## Motivation

Many of the components and applications we build rely on an extensive suite of mock data. The goal of totally is to make it easier to fetch and manage mock data while providing ways to track data contract changes.

Mock data should live as a tracked dependency of your source control. I check mock data into git which allows anyone to have a set of data that works with the component or application at any point they check out the repo. Using *real* data from *real* APIs allows you to guarantee that your application responds appropriately when pieces of data are missing or when the underlying data structure changes.

## Usage

Totally is made easier when it's a global dependency. Install with `npm i -g totally`.

Mock data is driven with a configuration file written in JavaScript. To get started, create a file in your app called `totally.js`. This script should export an array of configuration objects (don't worry, they are very lightweight).

An example configuration might look like:

```js
module.exports = [

  {
    filePath: 'name-of-scenario',
    endpoint: 'http://domain.com/api/endpoint?id=1234'
  }

];
```

After creating a configuration file, run totally from the command line with `totally`. Totally creates and modifies files and reports on the output.

**Custom handlers**

Configuration objects can also specify a handler for modifying the returned data. Handlers are passed a result object and must return an object, but anything you wish to do in a handler is up to you. For example:

```js
module.exports = [

  {
    filePath: 'name-of-scenario',
    endpoint: 'http://domain.com/api/endpoint?id=1234',
    handler: function (result) {
      return result.someNestedObject;
    }
  }

];
```

## About

**totally** is a project by [Aaron Godin](http://aarongodin.me).
