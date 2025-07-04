'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../../icon/index.js');
var prev = require('./prev2.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../../hooks/use-locale/index.js');

const __default__ = vue.defineComponent({
  name: "ElPaginationPrev"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: prev.paginationPrevProps,
  emits: prev.paginationPrevEmits,
  setup(__props) {
    const props = __props;
    const { t } = index.useLocale();
    const internalDisabled = vue.computed(() => props.disabled || props.currentPage <= 1);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("button", {
        type: "button",
        class: "btn-prev",
        disabled: vue.unref(internalDisabled),
        "aria-label": _ctx.prevText || vue.unref(t)("el.pagination.prev"),
        "aria-disabled": vue.unref(internalDisabled),
        onClick: ($event) => _ctx.$emit("click", $event)
      }, [
        _ctx.prevText ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, vue.toDisplayString(_ctx.prevText), 1)) : (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), { key: 1 }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.prevIcon)))
          ]),
          _: 1
        }))
      ], 8, ["disabled", "aria-label", "aria-disabled", "onClick"]);
    };
  }
});
var Prev = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "prev.vue"]]);

exports["default"] = Prev;
//# sourceMappingURL=prev.js.map
