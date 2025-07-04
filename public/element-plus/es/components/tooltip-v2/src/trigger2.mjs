import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const EventHandler = {
  type: definePropType(Function)
};
const tooltipV2TriggerProps = buildProps({
  onBlur: EventHandler,
  onClick: EventHandler,
  onFocus: EventHandler,
  onMouseDown: EventHandler,
  onMouseEnter: EventHandler,
  onMouseLeave: EventHandler
});

export { tooltipV2TriggerProps };
//# sourceMappingURL=trigger2.mjs.map
