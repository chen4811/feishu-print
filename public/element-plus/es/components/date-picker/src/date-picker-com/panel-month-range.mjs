import { defineComponent, inject, toRef, ref, computed, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, renderSlot, Fragment, renderList, toDisplayString, createCommentVNode, createVNode, withCtx } from 'vue';
import dayjs from 'dayjs';
import { ElIcon } from '../../../icon/index.mjs';
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';
import { isValidRange, getDefaultValue, correctlyParseUserInput } from '../utils.mjs';
import { panelMonthRangeProps, panelMonthRangeEmits } from '../props/panel-month-range.mjs';
import { useMonthRangeHeader } from '../composables/use-month-range-header.mjs';
import { useRangePicker } from '../composables/use-range-picker.mjs';
import MonthTable from './basic-month-table.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { isArray } from '@vue/shared';

const unit = "year";
const __default__ = defineComponent({
  name: "DatePickerMonthRange"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: panelMonthRangeProps,
  emits: panelMonthRangeEmits,
  setup(__props, { emit }) {
    const props = __props;
    const { lang } = useLocale();
    const pickerBase = inject("EP_PICKER_BASE");
    const isDefaultFormat = inject("ElIsDefaultFormat");
    const { shortcuts, disabledDate } = pickerBase.props;
    const format = toRef(pickerBase.props, "format");
    const defaultValue = toRef(pickerBase.props, "defaultValue");
    const leftDate = ref(dayjs().locale(lang.value));
    const rightDate = ref(dayjs().locale(lang.value).add(1, unit));
    const {
      minDate,
      maxDate,
      rangeState,
      ppNs,
      drpNs,
      handleChangeRange,
      handleRangeConfirm,
      handleShortcutClick,
      onSelect
    } = useRangePicker(props, {
      defaultValue,
      leftDate,
      rightDate,
      unit,
      onParsedValueChanged
    });
    const hasShortcuts = computed(() => !!shortcuts.length);
    const {
      leftPrevYear,
      rightNextYear,
      leftNextYear,
      rightPrevYear,
      leftLabel,
      rightLabel,
      leftYear,
      rightYear
    } = useMonthRangeHeader({
      unlinkPanels: toRef(props, "unlinkPanels"),
      leftDate,
      rightDate
    });
    const enableYearArrow = computed(() => {
      return props.unlinkPanels && rightYear.value > leftYear.value + 1;
    });
    const handleRangePick = (val, close = true) => {
      const minDate_ = val.minDate;
      const maxDate_ = val.maxDate;
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      emit("calendar-change", [minDate_.toDate(), maxDate_ && maxDate_.toDate()]);
      maxDate.value = maxDate_;
      minDate.value = minDate_;
      if (!close)
        return;
      handleRangeConfirm();
    };
    const handleClear = () => {
      leftDate.value = getDefaultValue(unref(defaultValue), {
        lang: unref(lang),
        unit: "year",
        unlinkPanels: props.unlinkPanels
      })[0];
      rightDate.value = leftDate.value.add(1, "year");
      emit("pick", null);
    };
    const formatToString = (value) => {
      return isArray(value) ? value.map((_) => _.format(format.value)) : value.format(format.value);
    };
    const parseUserInput = (value) => {
      return correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
    };
    function onParsedValueChanged(minDate2, maxDate2) {
      if (props.unlinkPanels && maxDate2) {
        const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
        const maxDateYear = maxDate2.year();
        rightDate.value = minDateYear === maxDateYear ? maxDate2.add(1, unit) : maxDate2;
      } else {
        rightDate.value = leftDate.value.add(1, unit);
      }
    }
    emit("set-picker-option", ["isValidValue", isValidRange]);
    emit("set-picker-option", ["formatToString", formatToString]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["handleClear", handleClear]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ppNs).b(),
          unref(drpNs).b(),
          {
            "has-sidebar": Boolean(_ctx.$slots.sidebar) || unref(hasShortcuts)
          }
        ])
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ppNs).e("body-wrapper"))
        }, [
          renderSlot(_ctx.$slots, "sidebar", {
            class: normalizeClass(unref(ppNs).e("sidebar"))
          }),
          unref(hasShortcuts) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(ppNs).e("sidebar"))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(shortcuts), (shortcut, key) => {
              return openBlock(), createElementBlock("button", {
                key,
                type: "button",
                class: normalizeClass(unref(ppNs).e("shortcut")),
                onClick: ($event) => unref(handleShortcutClick)(shortcut)
              }, toDisplayString(shortcut.text), 11, ["onClick"]);
            }), 128))
          ], 2)) : createCommentVNode("v-if", true),
          createElementVNode("div", {
            class: normalizeClass(unref(ppNs).e("body"))
          }, [
            createElementVNode("div", {
              class: normalizeClass([[unref(ppNs).e("content"), unref(drpNs).e("content")], "is-left"])
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(drpNs).e("header"))
              }, [
                createElementVNode("button", {
                  type: "button",
                  class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-left"]),
                  onClick: unref(leftPrevYear)
                }, [
                  renderSlot(_ctx.$slots, "prev-year", {}, () => [
                    createVNode(unref(ElIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(DArrowLeft))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["onClick"]),
                _ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  disabled: !unref(enableYearArrow),
                  class: normalizeClass([[
                    unref(ppNs).e("icon-btn"),
                    { [unref(ppNs).is("disabled")]: !unref(enableYearArrow) }
                  ], "d-arrow-right"]),
                  onClick: unref(leftNextYear)
                }, [
                  renderSlot(_ctx.$slots, "next-year", {}, () => [
                    createVNode(unref(ElIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(DArrowRight))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["disabled", "onClick"])) : createCommentVNode("v-if", true),
                createElementVNode("div", null, toDisplayString(unref(leftLabel)), 1)
              ], 2),
              createVNode(MonthTable, {
                "selection-mode": "range",
                date: leftDate.value,
                "min-date": unref(minDate),
                "max-date": unref(maxDate),
                "range-state": unref(rangeState),
                "disabled-date": unref(disabledDate),
                onChangerange: unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
            ], 2),
            createElementVNode("div", {
              class: normalizeClass([[unref(ppNs).e("content"), unref(drpNs).e("content")], "is-right"])
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(drpNs).e("header"))
              }, [
                _ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  disabled: !unref(enableYearArrow),
                  class: normalizeClass([[unref(ppNs).e("icon-btn"), { "is-disabled": !unref(enableYearArrow) }], "d-arrow-left"]),
                  onClick: unref(rightPrevYear)
                }, [
                  renderSlot(_ctx.$slots, "prev-year", {}, () => [
                    createVNode(unref(ElIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(DArrowLeft))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["disabled", "onClick"])) : createCommentVNode("v-if", true),
                createElementVNode("button", {
                  type: "button",
                  class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                  onClick: unref(rightNextYear)
                }, [
                  renderSlot(_ctx.$slots, "next-year", {}, () => [
                    createVNode(unref(ElIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(DArrowRight))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["onClick"]),
                createElementVNode("div", null, toDisplayString(unref(rightLabel)), 1)
              ], 2),
              createVNode(MonthTable, {
                "selection-mode": "range",
                date: rightDate.value,
                "min-date": unref(minDate),
                "max-date": unref(maxDate),
                "range-state": unref(rangeState),
                "disabled-date": unref(disabledDate),
                onChangerange: unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
            ], 2)
          ], 2)
        ], 2)
      ], 2);
    };
  }
});
var MonthRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "panel-month-range.vue"]]);

export { MonthRangePickPanel as default };
//# sourceMappingURL=panel-month-range.mjs.map
