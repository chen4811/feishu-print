'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var alert$1 = require('./src/alert.js');
var alert = require('./src/alert2.js');
var install = require('../../utils/vue/install.js');

const ElAlert = install.withInstall(alert$1["default"]);

exports.alertEffects = alert.alertEffects;
exports.alertEmits = alert.alertEmits;
exports.alertProps = alert.alertProps;
exports.ElAlert = ElAlert;
exports["default"] = ElAlert;
//# sourceMappingURL=index.js.map
