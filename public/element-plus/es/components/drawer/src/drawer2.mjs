import { dialogProps, dialogEmits } from '../../dialog/src/dialog2.mjs';
import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const drawerProps = buildProps({
  ...dialogProps,
  direction: {
    type: String,
    default: "rtl",
    values: ["ltr", "rtl", "ttb", "btt"]
  },
  size: {
    type: [String, Number],
    default: "30%"
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  modalFade: {
    type: Boolean,
    default: true
  },
  headerAriaLevel: {
    type: String,
    default: "2"
  }
});
const drawerEmits = dialogEmits;

export { drawerEmits, drawerProps };
//# sourceMappingURL=drawer2.mjs.map
