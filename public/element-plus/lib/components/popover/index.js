'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popover$1 = require('./src/popover.js');
var directive = require('./src/directive.js');
var popover = require('./src/popover2.js');
var install = require('../../utils/vue/install.js');

const ElPopoverDirective = install.withInstallDirective(directive["default"], directive.VPopover);
const ElPopover = install.withInstall(popover$1["default"], {
  directive: ElPopoverDirective
});

exports.popoverEmits = popover.popoverEmits;
exports.popoverProps = popover.popoverProps;
exports.ElPopover = ElPopover;
exports.ElPopoverDirective = ElPopoverDirective;
exports["default"] = ElPopover;
//# sourceMappingURL=index.js.map
