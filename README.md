# Ember Service Worker Cache Fallback

_An Ember Service Worker plugin that resorts to a cached fallback version when
the network request fails_

## Installation

```
ember install ember-service-worker-cache-fallback
```

## Configuration

The configuration is done in the `ember-cli-build.js` file:

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'esw-cache-fallback': {
      // RegExp patterns specifying which URLs to cache.
      patterns: [
        '/api/v1/(.+)',
        'https://cdn.example.com/assets/fonts/(.+)',
        'https://cdn.example.com/assets/images/((?!avatars/).+)'
      ],

      // changing this version number will bust the cache
      version: '1'
    }
  });

  return app.toTree();
};
```

## Authors

* [Marten Schilstra](http://twitter.com/martndemus)

## Versioning

This library follows [Semantic Versioning](http://semver.org)

## Want to help?

Please do! We are always looking to improve this library. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-service-worker-cache-fallback/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal

[DockYard](http://dockyard.com/), Inc. &copy; 2016

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
