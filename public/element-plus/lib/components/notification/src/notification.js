'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var iconsVue = require('@element-plus/icons-vue');
var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');

const notificationTypes = [
  "primary",
  "success",
  "info",
  "warning",
  "error"
];
const notificationProps = runtime.buildProps({
  customClass: {
    type: String,
    default: ""
  },
  dangerouslyUseHTMLString: Boolean,
  duration: {
    type: Number,
    default: 4500
  },
  icon: {
    type: icon.iconPropType
  },
  id: {
    type: String,
    default: ""
  },
  message: {
    type: runtime.definePropType([
      String,
      Object,
      Function
    ]),
    default: ""
  },
  offset: {
    type: Number,
    default: 0
  },
  onClick: {
    type: runtime.definePropType(Function),
    default: () => void 0
  },
  onClose: {
    type: runtime.definePropType(Function),
    required: true
  },
  position: {
    type: String,
    values: ["top-right", "top-left", "bottom-right", "bottom-left"],
    default: "top-right"
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    values: [...notificationTypes, ""],
    default: ""
  },
  zIndex: Number,
  closeIcon: {
    type: icon.iconPropType,
    default: iconsVue.Close
  }
});
const notificationEmits = {
  destroy: () => true
};

exports.notificationEmits = notificationEmits;
exports.notificationProps = notificationProps;
exports.notificationTypes = notificationTypes;
//# sourceMappingURL=notification.js.map
