import { getCurrentInstance, inject, ref, unref, watch } from 'vue';
import dayjs from 'dayjs';
import { isValidRange, getDefaultValue } from '../utils.mjs';
import { ROOT_PICKER_INJECTION_KEY } from '../constants.mjs';
import { useShortcut } from './use-shortcut.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { isArray } from '@vue/shared';

const useRangePicker = (props, {
  defaultValue,
  defaultTime,
  leftDate,
  rightDate,
  unit,
  onParsedValueChanged
}) => {
  const { emit } = getCurrentInstance();
  const { pickerNs } = inject(ROOT_PICKER_INJECTION_KEY);
  const drpNs = useNamespace("date-range-picker");
  const { t, lang } = useLocale();
  const handleShortcutClick = useShortcut(lang);
  const minDate = ref();
  const maxDate = ref();
  const rangeState = ref({
    endDate: null,
    selecting: false
  });
  const handleChangeRange = (val) => {
    rangeState.value = val;
  };
  const handleRangeConfirm = (visible = false) => {
    const _minDate = unref(minDate);
    const _maxDate = unref(maxDate);
    if (isValidRange([_minDate, _maxDate])) {
      emit("pick", [_minDate, _maxDate], visible);
    }
  };
  const onSelect = (selecting) => {
    rangeState.value.selecting = selecting;
    if (!selecting) {
      rangeState.value.endDate = null;
    }
  };
  const onReset = (parsedValue) => {
    if (isArray(parsedValue) && parsedValue.length === 2) {
      const [start, end] = parsedValue;
      minDate.value = start;
      leftDate.value = start;
      maxDate.value = end;
      onParsedValueChanged(unref(minDate), unref(maxDate));
    } else {
      restoreDefault();
    }
  };
  const restoreDefault = () => {
    let [start, end] = getDefaultValue(unref(defaultValue), {
      lang: unref(lang),
      unit,
      unlinkPanels: props.unlinkPanels
    });
    const getShift = (day) => {
      return day.diff(day.startOf("d"), "ms");
    };
    const maybeTimes = unref(defaultTime);
    if (maybeTimes) {
      let leftShift = 0;
      let rightShift = 0;
      if (isArray(maybeTimes)) {
        const [timeStart, timeEnd] = maybeTimes.map(dayjs);
        leftShift = getShift(timeStart);
        rightShift = getShift(timeEnd);
      } else {
        const shift = getShift(dayjs(maybeTimes));
        leftShift = shift;
        rightShift = shift;
      }
      start = start.startOf("d").add(leftShift, "ms");
      end = end.startOf("d").add(rightShift, "ms");
    }
    minDate.value = void 0;
    maxDate.value = void 0;
    leftDate.value = start;
    rightDate.value = end;
  };
  watch(defaultValue, (val) => {
    if (val) {
      restoreDefault();
    }
  }, { immediate: true });
  watch(() => props.parsedValue, onReset, { immediate: true });
  return {
    minDate,
    maxDate,
    rangeState,
    lang,
    ppNs: pickerNs,
    drpNs,
    handleChangeRange,
    handleRangeConfirm,
    handleShortcutClick,
    onSelect,
    onReset,
    t
  };
};

export { useRangePicker };
//# sourceMappingURL=use-range-picker.mjs.map
