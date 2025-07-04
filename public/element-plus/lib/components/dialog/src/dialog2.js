'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dialogContent = require('./dialog-content.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var teleport = require('../../teleport/src/teleport.js');
var event = require('../../../constants/event.js');
var types = require('../../../utils/types.js');

const dialogProps = runtime.buildProps({
  ...dialogContent.dialogContentProps,
  appendToBody: Boolean,
  appendTo: {
    type: teleport.teleportProps.to.type,
    default: "body"
  },
  beforeClose: {
    type: runtime.definePropType(Function)
  },
  destroyOnClose: Boolean,
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: Boolean,
  modalClass: String,
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  width: {
    type: [String, Number]
  },
  zIndex: {
    type: Number
  },
  trapFocus: Boolean,
  headerAriaLevel: {
    type: String,
    default: "2"
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [event.UPDATE_MODEL_EVENT]: (value) => types.isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};

exports.dialogEmits = dialogEmits;
exports.dialogProps = dialogProps;
//# sourceMappingURL=dialog2.js.map
