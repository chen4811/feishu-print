import { tooltipV2RootProps } from './root.mjs';
import { tooltipV2TriggerProps } from './trigger2.mjs';
import { tooltipV2ArrowProps } from './arrow.mjs';
import { tooltipV2ContentProps } from './content.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const tooltipV2Props = buildProps({
  ...tooltipV2RootProps,
  ...tooltipV2ArrowProps,
  ...tooltipV2TriggerProps,
  ...tooltipV2ContentProps,
  alwaysOn: Boolean,
  fullTransition: Boolean,
  transitionProps: {
    type: definePropType(Object),
    default: null
  },
  teleported: Boolean,
  to: {
    type: definePropType(String),
    default: "body"
  }
});

export { tooltipV2Props };
//# sourceMappingURL=tooltip2.mjs.map
