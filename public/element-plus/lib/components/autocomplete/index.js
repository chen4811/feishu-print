'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var autocomplete$1 = require('./src/autocomplete.js');
var autocomplete = require('./src/autocomplete2.js');
var install = require('../../utils/vue/install.js');

const ElAutocomplete = install.withInstall(autocomplete$1["default"]);

exports.autocompleteEmits = autocomplete.autocompleteEmits;
exports.autocompleteProps = autocomplete.autocompleteProps;
exports.ElAutocomplete = ElAutocomplete;
exports["default"] = ElAutocomplete;
//# sourceMappingURL=index.js.map
