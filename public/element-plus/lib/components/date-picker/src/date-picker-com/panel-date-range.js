'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var index$4 = require('../../../button/index.js');
var index$1 = require('../../../input/index.js');
require('../../../time-picker/index.js');
var index$3 = require('../../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var panelDateRange = require('../props/panel-date-range.js');
var useRangePicker = require('../composables/use-range-picker.js');
var utils$1 = require('../utils.js');
var usePanelDateRange = require('../composables/use-panel-date-range.js');
var basicYearTable = require('./basic-year-table.js');
var basicMonthTable = require('./basic-month-table.js');
var basicDateTable = require('./basic-date-table.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var panelTimePick = require('../../../time-picker/src/time-picker-com/panel-time-pick.js');
var index$2 = require('../../../../directives/click-outside/index.js');
var index = require('../../../../hooks/use-locale/index.js');
var utils = require('../../../time-picker/src/utils.js');
var shared = require('@vue/shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

const unit = "month";
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "panel-date-range",
  props: panelDateRange.panelDateRangeProps,
  emits: [
    "pick",
    "set-picker-option",
    "calendar-change",
    "panel-change"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const pickerBase = vue.inject("EP_PICKER_BASE");
    const isDefaultFormat = vue.inject("ElIsDefaultFormat");
    const { disabledDate, cellClassName, defaultTime, clearable } = pickerBase.props;
    const format = vue.toRef(pickerBase.props, "format");
    const shortcuts = vue.toRef(pickerBase.props, "shortcuts");
    const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
    const { lang } = index.useLocale();
    const leftDate = vue.ref(dayjs__default["default"]().locale(lang.value));
    const rightDate = vue.ref(dayjs__default["default"]().locale(lang.value).add(1, unit));
    const {
      minDate,
      maxDate,
      rangeState,
      ppNs,
      drpNs,
      handleChangeRange,
      handleRangeConfirm,
      handleShortcutClick,
      onSelect,
      onReset,
      t
    } = useRangePicker.useRangePicker(props, {
      defaultValue,
      defaultTime,
      leftDate,
      rightDate,
      unit,
      onParsedValueChanged
    });
    vue.watch(() => props.visible, (visible) => {
      if (!visible && rangeState.value.selecting) {
        onReset(props.parsedValue);
        onSelect(false);
      }
    });
    const dateUserInput = vue.ref({
      min: null,
      max: null
    });
    const timeUserInput = vue.ref({
      min: null,
      max: null
    });
    const {
      leftCurrentView,
      rightCurrentView,
      leftCurrentViewRef,
      rightCurrentViewRef,
      leftYear,
      rightYear,
      leftMonth,
      rightMonth,
      leftYearLabel,
      rightYearLabel,
      showLeftPicker,
      showRightPicker,
      handleLeftYearPick,
      handleRightYearPick,
      handleLeftMonthPick,
      handleRightMonthPick,
      handlePanelChange,
      adjustDateByView
    } = usePanelDateRange.usePanelDateRange(props, emit, leftDate, rightDate);
    const hasShortcuts = vue.computed(() => !!shortcuts.value.length);
    const minVisibleDate = vue.computed(() => {
      if (dateUserInput.value.min !== null)
        return dateUserInput.value.min;
      if (minDate.value)
        return minDate.value.format(dateFormat.value);
      return "";
    });
    const maxVisibleDate = vue.computed(() => {
      if (dateUserInput.value.max !== null)
        return dateUserInput.value.max;
      if (maxDate.value || minDate.value)
        return (maxDate.value || minDate.value).format(dateFormat.value);
      return "";
    });
    const minVisibleTime = vue.computed(() => {
      if (timeUserInput.value.min !== null)
        return timeUserInput.value.min;
      if (minDate.value)
        return minDate.value.format(timeFormat.value);
      return "";
    });
    const maxVisibleTime = vue.computed(() => {
      if (timeUserInput.value.max !== null)
        return timeUserInput.value.max;
      if (maxDate.value || minDate.value)
        return (maxDate.value || minDate.value).format(timeFormat.value);
      return "";
    });
    const timeFormat = vue.computed(() => {
      return props.timeFormat || utils.extractTimeFormat(format.value);
    });
    const dateFormat = vue.computed(() => {
      return props.dateFormat || utils.extractDateFormat(format.value);
    });
    const isValidValue = (date) => {
      return utils$1.isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
    };
    const leftPrevYear = () => {
      leftDate.value = adjustDateByView(leftCurrentView.value, leftDate.value, false);
      if (!props.unlinkPanels) {
        rightDate.value = leftDate.value.add(1, "month");
      }
      handlePanelChange("year");
    };
    const leftPrevMonth = () => {
      leftDate.value = leftDate.value.subtract(1, "month");
      if (!props.unlinkPanels) {
        rightDate.value = leftDate.value.add(1, "month");
      }
      handlePanelChange("month");
    };
    const rightNextYear = () => {
      if (!props.unlinkPanels) {
        leftDate.value = adjustDateByView(rightCurrentView.value, leftDate.value, true);
        rightDate.value = leftDate.value.add(1, "month");
      } else {
        rightDate.value = adjustDateByView(rightCurrentView.value, rightDate.value, true);
      }
      handlePanelChange("year");
    };
    const rightNextMonth = () => {
      if (!props.unlinkPanels) {
        leftDate.value = leftDate.value.add(1, "month");
        rightDate.value = leftDate.value.add(1, "month");
      } else {
        rightDate.value = rightDate.value.add(1, "month");
      }
      handlePanelChange("month");
    };
    const leftNextYear = () => {
      leftDate.value = adjustDateByView(leftCurrentView.value, leftDate.value, true);
      handlePanelChange("year");
    };
    const leftNextMonth = () => {
      leftDate.value = leftDate.value.add(1, "month");
      handlePanelChange("month");
    };
    const rightPrevYear = () => {
      rightDate.value = adjustDateByView(rightCurrentView.value, rightDate.value, false);
      handlePanelChange("year");
    };
    const rightPrevMonth = () => {
      rightDate.value = rightDate.value.subtract(1, "month");
      handlePanelChange("month");
    };
    const enableMonthArrow = vue.computed(() => {
      const nextMonth = (leftMonth.value + 1) % 12;
      const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
      return props.unlinkPanels && new Date(leftYear.value + yearOffset, nextMonth) < new Date(rightYear.value, rightMonth.value);
    });
    const enableYearArrow = vue.computed(() => {
      return props.unlinkPanels && rightYear.value * 12 + rightMonth.value - (leftYear.value * 12 + leftMonth.value + 1) >= 12;
    });
    const btnDisabled = vue.computed(() => {
      return !(minDate.value && maxDate.value && !rangeState.value.selecting && utils$1.isValidRange([minDate.value, maxDate.value]));
    });
    const showTime = vue.computed(() => props.type === "datetime" || props.type === "datetimerange");
    const formatEmit = (emitDayjs, index) => {
      if (!emitDayjs)
        return;
      if (defaultTime) {
        const defaultTimeD = dayjs__default["default"](defaultTime[index] || defaultTime).locale(lang.value);
        return defaultTimeD.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      return emitDayjs;
    };
    const handleRangePick = (val, close = true) => {
      const min_ = val.minDate;
      const max_ = val.maxDate;
      const minDate_ = formatEmit(min_, 0);
      const maxDate_ = formatEmit(max_, 1);
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      emit("calendar-change", [min_.toDate(), max_ && max_.toDate()]);
      maxDate.value = maxDate_;
      minDate.value = minDate_;
      if (!close || showTime.value)
        return;
      handleRangeConfirm();
    };
    const minTimePickerVisible = vue.ref(false);
    const maxTimePickerVisible = vue.ref(false);
    const handleMinTimeClose = () => {
      minTimePickerVisible.value = false;
    };
    const handleMaxTimeClose = () => {
      maxTimePickerVisible.value = false;
    };
    const handleDateInput = (value, type) => {
      dateUserInput.value[type] = value;
      const parsedValueD = dayjs__default["default"](value, dateFormat.value).locale(lang.value);
      if (parsedValueD.isValid()) {
        if (disabledDate && disabledDate(parsedValueD.toDate())) {
          return;
        }
        if (type === "min") {
          leftDate.value = parsedValueD;
          minDate.value = (minDate.value || leftDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
          if (!props.unlinkPanels && (!maxDate.value || maxDate.value.isBefore(minDate.value))) {
            rightDate.value = parsedValueD.add(1, "month");
            maxDate.value = minDate.value.add(1, "month");
          }
        } else {
          rightDate.value = parsedValueD;
          maxDate.value = (maxDate.value || rightDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
          if (!props.unlinkPanels && (!minDate.value || minDate.value.isAfter(maxDate.value))) {
            leftDate.value = parsedValueD.subtract(1, "month");
            minDate.value = maxDate.value.subtract(1, "month");
          }
        }
      }
    };
    const handleDateChange = (_, type) => {
      dateUserInput.value[type] = null;
    };
    const handleTimeInput = (value, type) => {
      timeUserInput.value[type] = value;
      const parsedValueD = dayjs__default["default"](value, timeFormat.value).locale(lang.value);
      if (parsedValueD.isValid()) {
        if (type === "min") {
          minTimePickerVisible.value = true;
          minDate.value = (minDate.value || leftDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
        } else {
          maxTimePickerVisible.value = true;
          maxDate.value = (maxDate.value || rightDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
          rightDate.value = maxDate.value;
        }
      }
    };
    const handleTimeChange = (_value, type) => {
      timeUserInput.value[type] = null;
      if (type === "min") {
        leftDate.value = minDate.value;
        minTimePickerVisible.value = false;
        if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
          maxDate.value = minDate.value;
        }
      } else {
        rightDate.value = maxDate.value;
        maxTimePickerVisible.value = false;
        if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
          minDate.value = maxDate.value;
        }
      }
    };
    const handleMinTimePick = (value, visible, first) => {
      if (timeUserInput.value.min)
        return;
      if (value) {
        leftDate.value = value;
        minDate.value = (minDate.value || leftDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
      }
      if (!first) {
        minTimePickerVisible.value = visible;
      }
      if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
        maxDate.value = minDate.value;
        rightDate.value = value;
      }
    };
    const handleMaxTimePick = (value, visible, first) => {
      if (timeUserInput.value.max)
        return;
      if (value) {
        rightDate.value = value;
        maxDate.value = (maxDate.value || rightDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
      }
      if (!first) {
        maxTimePickerVisible.value = visible;
      }
      if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
        minDate.value = maxDate.value;
      }
    };
    const handleClear = () => {
      leftDate.value = utils$1.getDefaultValue(vue.unref(defaultValue), {
        lang: vue.unref(lang),
        unit: "month",
        unlinkPanels: props.unlinkPanels
      })[0];
      rightDate.value = leftDate.value.add(1, "month");
      maxDate.value = void 0;
      minDate.value = void 0;
      emit("pick", null);
    };
    const formatToString = (value) => {
      return shared.isArray(value) ? value.map((_) => _.format(format.value)) : value.format(format.value);
    };
    const parseUserInput = (value) => {
      return utils$1.correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
    };
    function onParsedValueChanged(minDate2, maxDate2) {
      if (props.unlinkPanels && maxDate2) {
        const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
        const minDateMonth = (minDate2 == null ? void 0 : minDate2.month()) || 0;
        const maxDateYear = maxDate2.year();
        const maxDateMonth = maxDate2.month();
        rightDate.value = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? maxDate2.add(1, unit) : maxDate2;
      } else {
        rightDate.value = leftDate.value.add(1, unit);
        if (maxDate2) {
          rightDate.value = rightDate.value.hour(maxDate2.hour()).minute(maxDate2.minute()).second(maxDate2.second());
        }
      }
    }
    emit("set-picker-option", ["isValidValue", isValidValue]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["formatToString", formatToString]);
    emit("set-picker-option", ["handleClear", handleClear]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass([
          vue.unref(ppNs).b(),
          vue.unref(drpNs).b(),
          {
            "has-sidebar": _ctx.$slots.sidebar || vue.unref(hasShortcuts),
            "has-time": vue.unref(showTime)
          }
        ])
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(vue.unref(ppNs).e("body-wrapper"))
        }, [
          vue.renderSlot(_ctx.$slots, "sidebar", {
            class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
          }),
          vue.unref(hasShortcuts) ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(shortcuts), (shortcut, key) => {
              return vue.openBlock(), vue.createElementBlock("button", {
                key,
                type: "button",
                class: vue.normalizeClass(vue.unref(ppNs).e("shortcut")),
                onClick: ($event) => vue.unref(handleShortcutClick)(shortcut)
              }, vue.toDisplayString(shortcut.text), 11, ["onClick"]);
            }), 128))
          ], 2)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(ppNs).e("body"))
          }, [
            vue.unref(showTime) ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(vue.unref(drpNs).e("time-header"))
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(drpNs).e("editors-wrap"))
              }, [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                }, [
                  vue.createVNode(vue.unref(index$1.ElInput), {
                    size: "small",
                    disabled: vue.unref(rangeState).selecting,
                    placeholder: vue.unref(t)("el.datepicker.startDate"),
                    class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                    "model-value": vue.unref(minVisibleDate),
                    "validate-event": false,
                    onInput: (val) => handleDateInput(val, "min"),
                    onChange: (val) => handleDateChange(val, "min")
                  }, null, 8, ["disabled", "placeholder", "class", "model-value", "onInput", "onChange"])
                ], 2),
                vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
                  class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                }, [
                  vue.createVNode(vue.unref(index$1.ElInput), {
                    size: "small",
                    class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                    disabled: vue.unref(rangeState).selecting,
                    placeholder: vue.unref(t)("el.datepicker.startTime"),
                    "model-value": vue.unref(minVisibleTime),
                    "validate-event": false,
                    onFocus: ($event) => minTimePickerVisible.value = true,
                    onInput: (val) => handleTimeInput(val, "min"),
                    onChange: (val) => handleTimeChange(val, "min")
                  }, null, 8, ["class", "disabled", "placeholder", "model-value", "onFocus", "onInput", "onChange"]),
                  vue.createVNode(vue.unref(panelTimePick["default"]), {
                    visible: minTimePickerVisible.value,
                    format: vue.unref(timeFormat),
                    "datetime-role": "start",
                    "parsed-value": leftDate.value,
                    onPick: handleMinTimePick
                  }, null, 8, ["visible", "format", "parsed-value"])
                ], 2)), [
                  [vue.unref(index$2["default"]), handleMinTimeClose]
                ])
              ], 2),
              vue.createElementVNode("span", null, [
                vue.createVNode(vue.unref(index$3.ElIcon), null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(iconsVue.ArrowRight))
                  ]),
                  _: 1
                })
              ]),
              vue.createElementVNode("span", {
                class: vue.normalizeClass([vue.unref(drpNs).e("editors-wrap"), "is-right"])
              }, [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                }, [
                  vue.createVNode(vue.unref(index$1.ElInput), {
                    size: "small",
                    class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                    disabled: vue.unref(rangeState).selecting,
                    placeholder: vue.unref(t)("el.datepicker.endDate"),
                    "model-value": vue.unref(maxVisibleDate),
                    readonly: !vue.unref(minDate),
                    "validate-event": false,
                    onInput: (val) => handleDateInput(val, "max"),
                    onChange: (val) => handleDateChange(val, "max")
                  }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly", "onInput", "onChange"])
                ], 2),
                vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
                  class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                }, [
                  vue.createVNode(vue.unref(index$1.ElInput), {
                    size: "small",
                    class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                    disabled: vue.unref(rangeState).selecting,
                    placeholder: vue.unref(t)("el.datepicker.endTime"),
                    "model-value": vue.unref(maxVisibleTime),
                    readonly: !vue.unref(minDate),
                    "validate-event": false,
                    onFocus: ($event) => vue.unref(minDate) && (maxTimePickerVisible.value = true),
                    onInput: (val) => handleTimeInput(val, "max"),
                    onChange: (val) => handleTimeChange(val, "max")
                  }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly", "onFocus", "onInput", "onChange"]),
                  vue.createVNode(vue.unref(panelTimePick["default"]), {
                    "datetime-role": "end",
                    visible: maxTimePickerVisible.value,
                    format: vue.unref(timeFormat),
                    "parsed-value": rightDate.value,
                    onPick: handleMaxTimePick
                  }, null, 8, ["visible", "format", "parsed-value"])
                ], 2)), [
                  [vue.unref(index$2["default"]), handleMaxTimeClose]
                ])
              ], 2)
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", {
              class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-left"])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(drpNs).e("header"))
              }, [
                vue.createElementVNode("button", {
                  type: "button",
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-left"]),
                  "aria-label": vue.unref(t)(`el.datepicker.prevYear`),
                  onClick: leftPrevYear
                }, [
                  vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                    vue.createVNode(vue.unref(index$3.ElIcon), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.DArrowLeft))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["aria-label"]),
                vue.withDirectives(vue.createElementVNode("button", {
                  type: "button",
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-left"]),
                  "aria-label": vue.unref(t)(`el.datepicker.prevMonth`),
                  onClick: leftPrevMonth
                }, [
                  vue.renderSlot(_ctx.$slots, "prev-month", {}, () => [
                    vue.createVNode(vue.unref(index$3.ElIcon), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.ArrowLeft))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["aria-label"]), [
                  [vue.vShow, vue.unref(leftCurrentView) === "date"]
                ]),
                _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 0,
                  type: "button",
                  disabled: !vue.unref(enableYearArrow),
                  class: vue.normalizeClass([[vue.unref(ppNs).e("icon-btn"), { "is-disabled": !vue.unref(enableYearArrow) }], "d-arrow-right"]),
                  "aria-label": vue.unref(t)(`el.datepicker.nextYear`),
                  onClick: leftNextYear
                }, [
                  vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                    vue.createVNode(vue.unref(index$3.ElIcon), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.DArrowRight))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["disabled", "aria-label"])) : vue.createCommentVNode("v-if", true),
                _ctx.unlinkPanels && vue.unref(leftCurrentView) === "date" ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 1,
                  type: "button",
                  disabled: !vue.unref(enableMonthArrow),
                  class: vue.normalizeClass([[
                    vue.unref(ppNs).e("icon-btn"),
                    { "is-disabled": !vue.unref(enableMonthArrow) }
                  ], "arrow-right"]),
                  "aria-label": vue.unref(t)(`el.datepicker.nextMonth`),
                  onClick: leftNextMonth
                }, [
                  vue.renderSlot(_ctx.$slots, "next-month", {}, () => [
                    vue.createVNode(vue.unref(index$3.ElIcon), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.ArrowRight))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["disabled", "aria-label"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", null, [
                  vue.createElementVNode("span", {
                    role: "button",
                    class: vue.normalizeClass(vue.unref(drpNs).e("header-label")),
                    "aria-live": "polite",
                    tabindex: "0",
                    onKeydown: vue.withKeys(($event) => vue.unref(showLeftPicker)("year"), ["enter"]),
                    onClick: ($event) => vue.unref(showLeftPicker)("year")
                  }, vue.toDisplayString(vue.unref(leftYearLabel)), 43, ["onKeydown", "onClick"]),
                  vue.withDirectives(vue.createElementVNode("span", {
                    role: "button",
                    "aria-live": "polite",
                    tabindex: "0",
                    class: vue.normalizeClass([
                      vue.unref(drpNs).e("header-label"),
                      { active: vue.unref(leftCurrentView) === "month" }
                    ]),
                    onKeydown: vue.withKeys(($event) => vue.unref(showLeftPicker)("month"), ["enter"]),
                    onClick: ($event) => vue.unref(showLeftPicker)("month")
                  }, vue.toDisplayString(vue.unref(t)(`el.datepicker.month${leftDate.value.month() + 1}`)), 43, ["onKeydown", "onClick"]), [
                    [vue.vShow, vue.unref(leftCurrentView) === "date"]
                  ])
                ])
              ], 2),
              vue.unref(leftCurrentView) === "date" ? (vue.openBlock(), vue.createBlock(basicDateTable["default"], {
                key: 0,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "range",
                date: leftDate.value,
                "min-date": vue.unref(minDate),
                "max-date": vue.unref(maxDate),
                "range-state": vue.unref(rangeState),
                "disabled-date": vue.unref(disabledDate),
                "cell-class-name": vue.unref(cellClassName),
                onChangerange: vue.unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: vue.unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])) : vue.createCommentVNode("v-if", true),
              vue.unref(leftCurrentView) === "year" ? (vue.openBlock(), vue.createBlock(basicYearTable["default"], {
                key: 1,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "year",
                date: leftDate.value,
                "disabled-date": vue.unref(disabledDate),
                "parsed-value": _ctx.parsedValue,
                onPick: vue.unref(handleLeftYearPick)
              }, null, 8, ["date", "disabled-date", "parsed-value", "onPick"])) : vue.createCommentVNode("v-if", true),
              vue.unref(leftCurrentView) === "month" ? (vue.openBlock(), vue.createBlock(basicMonthTable["default"], {
                key: 2,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "month",
                date: leftDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": vue.unref(disabledDate),
                onPick: vue.unref(handleLeftMonthPick)
              }, null, 8, ["date", "parsed-value", "disabled-date", "onPick"])) : vue.createCommentVNode("v-if", true)
            ], 2),
            vue.createElementVNode("div", {
              class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-right"])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(drpNs).e("header"))
              }, [
                _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 0,
                  type: "button",
                  disabled: !vue.unref(enableYearArrow),
                  class: vue.normalizeClass([[vue.unref(ppNs).e("icon-btn"), { "is-disabled": !vue.unref(enableYearArrow) }], "d-arrow-left"]),
                  "aria-label": vue.unref(t)(`el.datepicker.prevYear`),
                  onClick: rightPrevYear
                }, [
                  vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                    vue.createVNode(vue.unref(index$3.ElIcon), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.DArrowLeft))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["disabled", "aria-label"])) : vue.createCommentVNode("v-if", true),
                _ctx.unlinkPanels && vue.unref(rightCurrentView) === "date" ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 1,
                  type: "button",
                  disabled: !vue.unref(enableMonthArrow),
                  class: vue.normalizeClass([[
                    vue.unref(ppNs).e("icon-btn"),
                    { "is-disabled": !vue.unref(enableMonthArrow) }
                  ], "arrow-left"]),
                  "aria-label": vue.unref(t)(`el.datepicker.prevMonth`),
                  onClick: rightPrevMonth
                }, [
                  vue.renderSlot(_ctx.$slots, "prev-month", {}, () => [
                    vue.createVNode(vue.unref(index$3.ElIcon), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.ArrowLeft))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["disabled", "aria-label"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("button", {
                  type: "button",
                  "aria-label": vue.unref(t)(`el.datepicker.nextYear`),
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                  onClick: rightNextYear
                }, [
                  vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                    vue.createVNode(vue.unref(index$3.ElIcon), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.DArrowRight))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["aria-label"]),
                vue.withDirectives(vue.createElementVNode("button", {
                  type: "button",
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-right"]),
                  "aria-label": vue.unref(t)(`el.datepicker.nextMonth`),
                  onClick: rightNextMonth
                }, [
                  vue.renderSlot(_ctx.$slots, "next-month", {}, () => [
                    vue.createVNode(vue.unref(index$3.ElIcon), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.ArrowRight))
                      ]),
                      _: 1
                    })
                  ])
                ], 10, ["aria-label"]), [
                  [vue.vShow, vue.unref(rightCurrentView) === "date"]
                ]),
                vue.createElementVNode("div", null, [
                  vue.createElementVNode("span", {
                    role: "button",
                    class: vue.normalizeClass(vue.unref(drpNs).e("header-label")),
                    "aria-live": "polite",
                    tabindex: "0",
                    onKeydown: vue.withKeys(($event) => vue.unref(showRightPicker)("year"), ["enter"]),
                    onClick: ($event) => vue.unref(showRightPicker)("year")
                  }, vue.toDisplayString(vue.unref(rightYearLabel)), 43, ["onKeydown", "onClick"]),
                  vue.withDirectives(vue.createElementVNode("span", {
                    role: "button",
                    "aria-live": "polite",
                    tabindex: "0",
                    class: vue.normalizeClass([
                      vue.unref(drpNs).e("header-label"),
                      { active: vue.unref(rightCurrentView) === "month" }
                    ]),
                    onKeydown: vue.withKeys(($event) => vue.unref(showRightPicker)("month"), ["enter"]),
                    onClick: ($event) => vue.unref(showRightPicker)("month")
                  }, vue.toDisplayString(vue.unref(t)(`el.datepicker.month${rightDate.value.month() + 1}`)), 43, ["onKeydown", "onClick"]), [
                    [vue.vShow, vue.unref(rightCurrentView) === "date"]
                  ])
                ])
              ], 2),
              vue.unref(rightCurrentView) === "date" ? (vue.openBlock(), vue.createBlock(basicDateTable["default"], {
                key: 0,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "range",
                date: rightDate.value,
                "min-date": vue.unref(minDate),
                "max-date": vue.unref(maxDate),
                "range-state": vue.unref(rangeState),
                "disabled-date": vue.unref(disabledDate),
                "cell-class-name": vue.unref(cellClassName),
                onChangerange: vue.unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: vue.unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])) : vue.createCommentVNode("v-if", true),
              vue.unref(rightCurrentView) === "year" ? (vue.openBlock(), vue.createBlock(basicYearTable["default"], {
                key: 1,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "year",
                date: rightDate.value,
                "disabled-date": vue.unref(disabledDate),
                "parsed-value": _ctx.parsedValue,
                onPick: vue.unref(handleRightYearPick)
              }, null, 8, ["date", "disabled-date", "parsed-value", "onPick"])) : vue.createCommentVNode("v-if", true),
              vue.unref(rightCurrentView) === "month" ? (vue.openBlock(), vue.createBlock(basicMonthTable["default"], {
                key: 2,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "month",
                date: rightDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": vue.unref(disabledDate),
                onPick: vue.unref(handleRightMonthPick)
              }, null, 8, ["date", "parsed-value", "disabled-date", "onPick"])) : vue.createCommentVNode("v-if", true)
            ], 2)
          ], 2)
        ], 2),
        vue.unref(showTime) ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(vue.unref(ppNs).e("footer"))
        }, [
          vue.unref(clearable) ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElButton), {
            key: 0,
            text: "",
            size: "small",
            class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
            onClick: handleClear
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(vue.unref(t)("el.datepicker.clear")), 1)
            ]),
            _: 1
          }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
          vue.createVNode(vue.unref(index$4.ElButton), {
            plain: "",
            size: "small",
            class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
            disabled: vue.unref(btnDisabled),
            onClick: ($event) => vue.unref(handleRangeConfirm)(false)
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(vue.unref(t)("el.datepicker.confirm")), 1)
            ]),
            _: 1
          }, 8, ["class", "disabled", "onClick"])
        ], 2)) : vue.createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var DateRangePickPanel = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "panel-date-range.vue"]]);

exports["default"] = DateRangePickPanel;
//# sourceMappingURL=panel-date-range.js.map
