'use strict';

const Plugin = require('broccoli-plugin');
const fs = require('fs');
const path = require('path');

module.exports = class Config extends Plugin {
  constructor(inputNodes, options) {
    super(inputNodes, {
      name: options && options.name,
      annotation: options && options.annotation
    });

    this.options = options;
  }

  generatePatternExport(patterns, key){
    if (patterns.length > 0) {
      patterns = patterns.map((pattern) => pattern.replace(/\\/g, '\\\\'));
      return `export const ${key} = ['${patterns.join("', '")}'];\n`;
    } else {
      return `export const ${key} = [];\n`;
    }
  }

  build() {
    let options = this.options;
    let version = options.version || '1';
    let patterns = options.patterns || [];
    let ignore = options.ignore || [];

    let module = '';

    module += `export const VERSION = '${version}';\n`;

    module += this.generatePatternExport(patterns, "PATTERNS")
    module += this.generatePatternExport(ignore, "IGNORE_PATTERNS")

    fs.writeFileSync(path.join(this.outputPath, 'config.js'), module);
  }
};
