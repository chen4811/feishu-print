import { defineComponent, toRefs, reactive, openBlock, createBlock, normalizeProps, guardReactiveProps, withCtx, createVNode, mergeProps, renderSlot, unref, Transition, createCommentVNode, createElementBlock, Fragment } from 'vue';
import { pick } from 'lodash-unified';
import { ElTeleport } from '../../teleport/index.mjs';
import { tooltipV2ArrowProps } from './arrow.mjs';
import { tooltipV2ContentProps } from './content.mjs';
import { tooltipV2RootProps } from './root.mjs';
import { tooltipV2Props } from './tooltip2.mjs';
import { tooltipV2TriggerProps } from './trigger2.mjs';
import TooltipV2Root from './root2.mjs';
import TooltipV2Arrow from './arrow2.mjs';
import TooltipV2Content from './content2.mjs';
import TooltipV2Trigger from './trigger.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';

const __default__ = defineComponent({
  name: "ElTooltipV2"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: tooltipV2Props,
  setup(__props) {
    const props = __props;
    const refedProps = toRefs(props);
    const arrowProps = reactive(pick(refedProps, Object.keys(tooltipV2ArrowProps)));
    const contentProps = reactive(pick(refedProps, Object.keys(tooltipV2ContentProps)));
    const rootProps = reactive(pick(refedProps, Object.keys(tooltipV2RootProps)));
    const triggerProps = reactive(pick(refedProps, Object.keys(tooltipV2TriggerProps)));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TooltipV2Root, normalizeProps(guardReactiveProps(rootProps)), {
        default: withCtx(({ open }) => [
          createVNode(TooltipV2Trigger, mergeProps(triggerProps, { nowrap: "" }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "trigger")
            ]),
            _: 3
          }, 16),
          createVNode(unref(ElTeleport), {
            to: _ctx.to,
            disabled: !_ctx.teleported
          }, {
            default: withCtx(() => [
              _ctx.fullTransition ? (openBlock(), createBlock(Transition, normalizeProps(mergeProps({ key: 0 }, _ctx.transitionProps)), {
                default: withCtx(() => [
                  _ctx.alwaysOn || open ? (openBlock(), createBlock(TooltipV2Content, normalizeProps(mergeProps({ key: 0 }, contentProps)), {
                    arrow: withCtx(({ style, side }) => [
                      _ctx.showArrow ? (openBlock(), createBlock(TooltipV2Arrow, mergeProps({ key: 0 }, arrowProps, {
                        style,
                        side
                      }), null, 16, ["style", "side"])) : createCommentVNode("v-if", true)
                    ]),
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 16)) : createCommentVNode("v-if", true)
                ]),
                _: 2
              }, 1040)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                _ctx.alwaysOn || open ? (openBlock(), createBlock(TooltipV2Content, normalizeProps(mergeProps({ key: 0 }, contentProps)), {
                  arrow: withCtx(({ style, side }) => [
                    _ctx.showArrow ? (openBlock(), createBlock(TooltipV2Arrow, mergeProps({ key: 0 }, arrowProps, {
                      style,
                      side
                    }), null, 16, ["style", "side"])) : createCommentVNode("v-if", true)
                  ]),
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }, 16)) : createCommentVNode("v-if", true)
              ], 64))
            ]),
            _: 2
          }, 1032, ["to", "disabled"])
        ]),
        _: 3
      }, 16);
    };
  }
});
var TooltipV2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "tooltip.vue"]]);

export { TooltipV2 as default };
//# sourceMappingURL=tooltip.mjs.map
