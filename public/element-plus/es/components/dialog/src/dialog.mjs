import { defineComponent, useSlots, computed, ref, provide, openBlock, createBlock, unref, withCtx, createVNode, Transition, withDirectives, createElementVNode, normalizeClass, normalizeStyle, mergeProps, createSlots, renderSlot, createCommentVNode, vShow } from 'vue';
import { ElOverlay } from '../../overlay/index.mjs';
import ElFocusTrap from '../../focus-trap/src/focus-trap.mjs';
import { ElTeleport } from '../../teleport/index.mjs';
import ElDialogContent from './dialog-content2.mjs';
import { dialogInjectionKey } from './constants.mjs';
import { dialogProps, dialogEmits } from './dialog2.mjs';
import { useDialog } from './use-dialog.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useDeprecated } from '../../../hooks/use-deprecated/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useSameTarget } from '../../../hooks/use-same-target/index.mjs';

const __default__ = defineComponent({
  name: "ElDialog",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: dialogProps,
  emits: dialogEmits,
  setup(__props, { expose }) {
    const props = __props;
    const slots = useSlots();
    useDeprecated({
      scope: "el-dialog",
      from: "the title slot",
      replacement: "the header slot",
      version: "3.0.0",
      ref: "https://element-plus.org/en-US/component/dialog.html#slots"
    }, computed(() => !!slots.title));
    const ns = useNamespace("dialog");
    const dialogRef = ref();
    const headerRef = ref();
    const dialogContentRef = ref();
    const {
      visible,
      titleId,
      bodyId,
      style,
      overlayDialogStyle,
      rendered,
      zIndex,
      afterEnter,
      afterLeave,
      beforeLeave,
      handleClose,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented
    } = useDialog(props, dialogRef);
    provide(dialogInjectionKey, {
      dialogRef,
      headerRef,
      bodyId,
      ns,
      rendered,
      style
    });
    const overlayEvent = useSameTarget(onModalClick);
    const draggable = computed(() => props.draggable && !props.fullscreen);
    const resetPosition = () => {
      var _a;
      (_a = dialogContentRef.value) == null ? void 0 : _a.resetPosition();
    };
    expose({
      visible,
      dialogContentRef,
      resetPosition,
      handleClose
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTeleport), {
        to: _ctx.appendTo,
        disabled: _ctx.appendTo !== "body" ? false : !_ctx.appendToBody
      }, {
        default: withCtx(() => [
          createVNode(Transition, {
            name: "dialog-fade",
            onAfterEnter: unref(afterEnter),
            onAfterLeave: unref(afterLeave),
            onBeforeLeave: unref(beforeLeave),
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(unref(ElOverlay), {
                "custom-mask-event": "",
                mask: _ctx.modal,
                "overlay-class": _ctx.modalClass,
                "z-index": unref(zIndex)
              }, {
                default: withCtx(() => [
                  createElementVNode("div", {
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": _ctx.title || void 0,
                    "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                    "aria-describedby": unref(bodyId),
                    class: normalizeClass(`${unref(ns).namespace.value}-overlay-dialog`),
                    style: normalizeStyle(unref(overlayDialogStyle)),
                    onClick: unref(overlayEvent).onClick,
                    onMousedown: unref(overlayEvent).onMousedown,
                    onMouseup: unref(overlayEvent).onMouseup
                  }, [
                    createVNode(unref(ElFocusTrap), {
                      loop: "",
                      trapped: unref(visible),
                      "focus-start-el": "container",
                      onFocusAfterTrapped: unref(onOpenAutoFocus),
                      onFocusAfterReleased: unref(onCloseAutoFocus),
                      onFocusoutPrevented: unref(onFocusoutPrevented),
                      onReleaseRequested: unref(onCloseRequested)
                    }, {
                      default: withCtx(() => [
                        unref(rendered) ? (openBlock(), createBlock(ElDialogContent, mergeProps({
                          key: 0,
                          ref_key: "dialogContentRef",
                          ref: dialogContentRef
                        }, _ctx.$attrs, {
                          center: _ctx.center,
                          "align-center": _ctx.alignCenter,
                          "close-icon": _ctx.closeIcon,
                          draggable: unref(draggable),
                          overflow: _ctx.overflow,
                          fullscreen: _ctx.fullscreen,
                          "header-class": _ctx.headerClass,
                          "body-class": _ctx.bodyClass,
                          "footer-class": _ctx.footerClass,
                          "show-close": _ctx.showClose,
                          title: _ctx.title,
                          "aria-level": _ctx.headerAriaLevel,
                          onClose: unref(handleClose)
                        }), createSlots({
                          header: withCtx(() => [
                            !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                              key: 0,
                              close: unref(handleClose),
                              titleId: unref(titleId),
                              titleClass: unref(ns).e("title")
                            }) : renderSlot(_ctx.$slots, "title", { key: 1 })
                          ]),
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 2
                        }, [
                          _ctx.$slots.footer ? {
                            name: "footer",
                            fn: withCtx(() => [
                              renderSlot(_ctx.$slots, "footer")
                            ])
                          } : void 0
                        ]), 1040, ["center", "align-center", "close-icon", "draggable", "overflow", "fullscreen", "header-class", "body-class", "footer-class", "show-close", "title", "aria-level", "onClose"])) : createCommentVNode("v-if", true)
                      ]),
                      _: 3
                    }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                  ], 46, ["aria-label", "aria-labelledby", "aria-describedby", "onClick", "onMousedown", "onMouseup"])
                ]),
                _: 3
              }, 8, ["mask", "overlay-class", "z-index"]), [
                [vShow, unref(visible)]
              ])
            ]),
            _: 3
          }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
        ]),
        _: 3
      }, 8, ["to", "disabled"]);
    };
  }
});
var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "dialog.vue"]]);

export { Dialog as default };
//# sourceMappingURL=dialog.mjs.map
