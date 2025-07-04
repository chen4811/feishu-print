'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popconfirm$1 = require('./src/popconfirm.js');
var popconfirm = require('./src/popconfirm2.js');
var install = require('../../utils/vue/install.js');

const ElPopconfirm = install.withInstall(popconfirm$1["default"]);

exports.popconfirmEmits = popconfirm.popconfirmEmits;
exports.popconfirmProps = popconfirm.popconfirmProps;
exports.ElPopconfirm = ElPopconfirm;
exports["default"] = ElPopconfirm;
//# sourceMappingURL=index.js.map
