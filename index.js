/* jshint node: true */
'use strict';

var Config = require('./lib/config');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-service-worker-cache-fallback',

  included(app) {
    this._super.included && this._super.included.apply(this, arguments);
    this.app = app;
    this.app.options = this.app.options || {};
    this.app.options['esw-cache-fallback'] = this.app.options['esw-cache-fallback'] || {};
  },

  treeForServiceWorker(swTree, appTree) {
    var options = this.app.options['esw-cache-fallback'];
    var configFile = new Config([appTree], options);

    return mergeTrees([swTree, configFile]);
  }
};
