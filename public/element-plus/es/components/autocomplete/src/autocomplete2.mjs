import { useTooltipContentProps } from '../../tooltip/src/content.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { NOOP, isString, isObject } from '@vue/shared';
import { useAriaProps } from '../../../hooks/use-aria/index.mjs';
import { UPDATE_MODEL_EVENT, INPUT_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';

const autocompleteProps = buildProps({
  valueKey: {
    type: String,
    default: "value"
  },
  modelValue: {
    type: [String, Number],
    default: ""
  },
  debounce: {
    type: Number,
    default: 300
  },
  placement: {
    type: definePropType(String),
    values: [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end"
    ],
    default: "bottom-start"
  },
  fetchSuggestions: {
    type: definePropType([Function, Array]),
    default: NOOP
  },
  popperClass: {
    type: String,
    default: ""
  },
  triggerOnFocus: {
    type: Boolean,
    default: true
  },
  selectWhenUnmatched: {
    type: Boolean,
    default: false
  },
  hideLoading: {
    type: Boolean,
    default: false
  },
  teleported: useTooltipContentProps.teleported,
  appendTo: useTooltipContentProps.appendTo,
  highlightFirstItem: {
    type: Boolean,
    default: false
  },
  fitInputWidth: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: String,
  ...useAriaProps(["ariaLabel"])
});
const autocompleteEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isString(value),
  [INPUT_EVENT]: (value) => isString(value),
  [CHANGE_EVENT]: (value) => isString(value),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  select: (item) => isObject(item)
};

export { autocompleteEmits, autocompleteProps };
//# sourceMappingURL=autocomplete2.mjs.map
