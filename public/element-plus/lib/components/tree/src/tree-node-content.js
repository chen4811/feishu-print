'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../text/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElTreeNodeContent",
  props: {
    node: {
      type: Object,
      required: true
    },
    renderContent: Function
  },
  setup(props) {
    const ns = index.useNamespace("tree");
    const nodeInstance = vue.inject("NodeInstance");
    const tree = vue.inject("RootTree");
    return () => {
      const node = props.node;
      const { data, store } = node;
      return props.renderContent ? props.renderContent(vue.h, { _self: nodeInstance, node, data, store }) : vue.renderSlot(tree.ctx.slots, "default", { node, data }, () => [
        vue.h(index$1.ElText, { tag: "span", truncated: true, class: ns.be("node", "label") }, () => [node.label])
      ]);
    };
  }
});
var NodeContent = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "tree-node-content.vue"]]);

exports["default"] = NodeContent;
//# sourceMappingURL=tree-node-content.js.map
