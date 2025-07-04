'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('../../../../utils/vue/props/runtime.js');
var icon = require('../../../../utils/vue/icon.js');

const paginationPrevProps = runtime.buildProps({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  prevText: {
    type: String
  },
  prevIcon: {
    type: icon.iconPropType
  }
});
const paginationPrevEmits = {
  click: (evt) => evt instanceof MouseEvent
};

exports.paginationPrevEmits = paginationPrevEmits;
exports.paginationPrevProps = paginationPrevProps;
//# sourceMappingURL=prev2.js.map
