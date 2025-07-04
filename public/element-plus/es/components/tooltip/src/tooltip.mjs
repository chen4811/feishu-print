import { useTooltipContentProps } from './content.mjs';
import { useTooltipTriggerProps } from './trigger2.mjs';
import { popperProps } from '../../popper/src/popper.mjs';
import { popperArrowProps } from '../../popper/src/arrow.mjs';
import { createModelToggleComposable } from '../../../hooks/use-model-toggle/index.mjs';
import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = createModelToggleComposable("visible");
const useTooltipProps = buildProps({
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
  showArrow: {
    type: Boolean,
    default: true
  }
});
const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
];

export { tooltipEmits, useTooltipModelToggle, useTooltipModelToggleEmits, useTooltipModelToggleProps, useTooltipProps };
//# sourceMappingURL=tooltip.mjs.map
