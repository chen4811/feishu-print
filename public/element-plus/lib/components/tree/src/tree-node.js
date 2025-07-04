'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../collapse-transition/index.js');
var index$1 = require('../../checkbox/index.js');
var index$2 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var treeNodeContent = require('./tree-node-content.js');
var util = require('./model/util.js');
var useNodeExpandEventBroadcast = require('./model/useNodeExpandEventBroadcast.js');
var useDragNode = require('./model/useDragNode.js');
var node = require('./model/node.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$3 = require('../../../hooks/use-namespace/index.js');
var error = require('../../../utils/error.js');
var shared = require('@vue/shared');

const _sfc_main = vue.defineComponent({
  name: "ElTreeNode",
  components: {
    ElCollapseTransition: index.ElCollapseTransition,
    ElCheckbox: index$1.ElCheckbox,
    NodeContent: treeNodeContent["default"],
    ElIcon: index$2.ElIcon,
    Loading: iconsVue.Loading
  },
  props: {
    node: {
      type: node["default"],
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({})
    },
    accordion: Boolean,
    renderContent: Function,
    renderAfterExpand: Boolean,
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  emits: ["node-expand"],
  setup(props, ctx) {
    const ns = index$3.useNamespace("tree");
    const { broadcastExpanded } = useNodeExpandEventBroadcast.useNodeExpandEventBroadcast(props);
    const tree = vue.inject("RootTree");
    const expanded = vue.ref(false);
    const childNodeRendered = vue.ref(false);
    const oldChecked = vue.ref();
    const oldIndeterminate = vue.ref();
    const node$ = vue.ref();
    const dragEvents = vue.inject(useDragNode.dragEventsKey);
    const instance = vue.getCurrentInstance();
    vue.provide("NodeInstance", instance);
    if (!tree) {
      error.debugWarn("Tree", "Can not find node's tree.");
    }
    if (props.node.expanded) {
      expanded.value = true;
      childNodeRendered.value = true;
    }
    const childrenKey = tree.props.props["children"] || "children";
    vue.watch(() => {
      var _a;
      const children = (_a = props.node.data) == null ? void 0 : _a[childrenKey];
      return children && [...children];
    }, () => {
      props.node.updateChildren();
    });
    vue.watch(() => props.node.indeterminate, (val) => {
      handleSelectChange(props.node.checked, val);
    });
    vue.watch(() => props.node.checked, (val) => {
      handleSelectChange(val, props.node.indeterminate);
    });
    vue.watch(() => props.node.childNodes.length, () => props.node.reInitChecked());
    vue.watch(() => props.node.expanded, (val) => {
      vue.nextTick(() => expanded.value = val);
      if (val) {
        childNodeRendered.value = true;
      }
    });
    const getNodeKey = (node) => {
      return util.getNodeKey(tree.props.nodeKey, node.data);
    };
    const getNodeClass = (node) => {
      const nodeClassFunc = props.props.class;
      if (!nodeClassFunc) {
        return {};
      }
      let className;
      if (shared.isFunction(nodeClassFunc)) {
        const { data } = node;
        className = nodeClassFunc(data, node);
      } else {
        className = nodeClassFunc;
      }
      if (shared.isString(className)) {
        return { [className]: true };
      } else {
        return className;
      }
    };
    const handleSelectChange = (checked, indeterminate) => {
      if (oldChecked.value !== checked || oldIndeterminate.value !== indeterminate) {
        tree.ctx.emit("check-change", props.node.data, checked, indeterminate);
      }
      oldChecked.value = checked;
      oldIndeterminate.value = indeterminate;
    };
    const handleClick = (e) => {
      util.handleCurrentChange(tree.store, tree.ctx.emit, () => {
        var _a;
        const nodeKeyProp = (_a = tree == null ? void 0 : tree.props) == null ? void 0 : _a.nodeKey;
        if (nodeKeyProp) {
          const curNodeKey = getNodeKey(props.node);
          tree.store.value.setCurrentNodeKey(curNodeKey);
        } else {
          tree.store.value.setCurrentNode(props.node);
        }
      });
      tree.currentNode.value = props.node;
      if (tree.props.expandOnClickNode) {
        handleExpandIconClick();
      }
      if ((tree.props.checkOnClickNode || props.node.isLeaf && tree.props.checkOnClickLeaf && props.showCheckbox) && !props.node.disabled) {
        handleCheckChange(!props.node.checked);
      }
      tree.ctx.emit("node-click", props.node.data, props.node, instance, e);
    };
    const handleContextMenu = (event) => {
      var _a;
      if ((_a = tree.instance.vnode.props) == null ? void 0 : _a["onNodeContextmenu"]) {
        event.stopPropagation();
        event.preventDefault();
      }
      tree.ctx.emit("node-contextmenu", event, props.node.data, props.node, instance);
    };
    const handleExpandIconClick = () => {
      if (props.node.isLeaf)
        return;
      if (expanded.value) {
        tree.ctx.emit("node-collapse", props.node.data, props.node, instance);
        props.node.collapse();
      } else {
        props.node.expand(() => {
          ctx.emit("node-expand", props.node.data, props.node, instance);
        });
      }
    };
    const handleCheckChange = (value) => {
      props.node.setChecked(value, !(tree == null ? void 0 : tree.props.checkStrictly));
      vue.nextTick(() => {
        const store = tree.store.value;
        tree.ctx.emit("check", props.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        });
      });
    };
    const handleChildNodeExpand = (nodeData, node, instance2) => {
      broadcastExpanded(node);
      tree.ctx.emit("node-expand", nodeData, node, instance2);
    };
    const handleDragStart = (event) => {
      if (!tree.props.draggable)
        return;
      dragEvents.treeNodeDragStart({ event, treeNode: props });
    };
    const handleDragOver = (event) => {
      event.preventDefault();
      if (!tree.props.draggable)
        return;
      dragEvents.treeNodeDragOver({
        event,
        treeNode: { $el: node$.value, node: props.node }
      });
    };
    const handleDrop = (event) => {
      event.preventDefault();
    };
    const handleDragEnd = (event) => {
      if (!tree.props.draggable)
        return;
      dragEvents.treeNodeDragEnd(event);
    };
    return {
      ns,
      node$,
      tree,
      expanded,
      childNodeRendered,
      oldChecked,
      oldIndeterminate,
      getNodeKey,
      getNodeClass,
      handleSelectChange,
      handleClick,
      handleContextMenu,
      handleExpandIconClick,
      handleCheckChange,
      handleChildNodeExpand,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      CaretRight: iconsVue.CaretRight
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_loading = vue.resolveComponent("loading");
  const _component_node_content = vue.resolveComponent("node-content");
  const _component_el_tree_node = vue.resolveComponent("el-tree-node");
  const _component_el_collapse_transition = vue.resolveComponent("el-collapse-transition");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    ref: "node$",
    class: vue.normalizeClass([
      _ctx.ns.b("node"),
      _ctx.ns.is("expanded", _ctx.expanded),
      _ctx.ns.is("current", _ctx.node.isCurrent),
      _ctx.ns.is("hidden", !_ctx.node.visible),
      _ctx.ns.is("focusable", !_ctx.node.disabled),
      _ctx.ns.is("checked", !_ctx.node.disabled && _ctx.node.checked),
      _ctx.getNodeClass(_ctx.node)
    ]),
    role: "treeitem",
    tabindex: "-1",
    "aria-expanded": _ctx.expanded,
    "aria-disabled": _ctx.node.disabled,
    "aria-checked": _ctx.node.checked,
    draggable: _ctx.tree.props.draggable,
    "data-key": _ctx.getNodeKey(_ctx.node),
    onClick: vue.withModifiers(_ctx.handleClick, ["stop"]),
    onContextmenu: _ctx.handleContextMenu,
    onDragstart: vue.withModifiers(_ctx.handleDragStart, ["stop"]),
    onDragover: vue.withModifiers(_ctx.handleDragOver, ["stop"]),
    onDragend: vue.withModifiers(_ctx.handleDragEnd, ["stop"]),
    onDrop: vue.withModifiers(_ctx.handleDrop, ["stop"])
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.be("node", "content")),
      style: vue.normalizeStyle({ paddingLeft: (_ctx.node.level - 1) * _ctx.tree.props.indent + "px" })
    }, [
      _ctx.tree.props.icon || _ctx.CaretRight ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
        key: 0,
        class: vue.normalizeClass([
          _ctx.ns.be("node", "expand-icon"),
          _ctx.ns.is("leaf", _ctx.node.isLeaf),
          {
            expanded: !_ctx.node.isLeaf && _ctx.expanded
          }
        ]),
        onClick: vue.withModifiers(_ctx.handleExpandIconClick, ["stop"])
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tree.props.icon || _ctx.CaretRight)))
        ]),
        _: 1
      }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true),
      _ctx.showCheckbox ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
        key: 1,
        "model-value": _ctx.node.checked,
        indeterminate: _ctx.node.indeterminate,
        disabled: !!_ctx.node.disabled,
        onClick: vue.withModifiers(() => {
        }, ["stop"]),
        onChange: _ctx.handleCheckChange
      }, null, 8, ["model-value", "indeterminate", "disabled", "onClick", "onChange"])) : vue.createCommentVNode("v-if", true),
      _ctx.node.loading ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
        key: 2,
        class: vue.normalizeClass([_ctx.ns.be("node", "loading-icon"), _ctx.ns.is("loading")])
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_loading)
        ]),
        _: 1
      }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_node_content, {
        node: _ctx.node,
        "render-content": _ctx.renderContent
      }, null, 8, ["node", "render-content"])
    ], 6),
    vue.createVNode(_component_el_collapse_transition, null, {
      default: vue.withCtx(() => [
        !_ctx.renderAfterExpand || _ctx.childNodeRendered ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.ns.be("node", "children")),
          role: "group",
          "aria-expanded": _ctx.expanded,
          onClick: vue.withModifiers(() => {
          }, ["stop"])
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.node.childNodes, (child) => {
            return vue.openBlock(), vue.createBlock(_component_el_tree_node, {
              key: _ctx.getNodeKey(child),
              "render-content": _ctx.renderContent,
              "render-after-expand": _ctx.renderAfterExpand,
              "show-checkbox": _ctx.showCheckbox,
              node: child,
              accordion: _ctx.accordion,
              props: _ctx.props,
              onNodeExpand: _ctx.handleChildNodeExpand
            }, null, 8, ["render-content", "render-after-expand", "show-checkbox", "node", "accordion", "props", "onNodeExpand"]);
          }), 128))
        ], 10, ["aria-expanded", "onClick"])), [
          [vue.vShow, _ctx.expanded]
        ]) : vue.createCommentVNode("v-if", true)
      ]),
      _: 1
    })
  ], 42, ["aria-expanded", "aria-disabled", "aria-checked", "draggable", "data-key", "onClick", "onContextmenu", "onDragstart", "onDragover", "onDragend", "onDrop"])), [
    [vue.vShow, _ctx.node.visible]
  ]);
}
var ElTreeNode = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "tree-node.vue"]]);

exports["default"] = ElTreeNode;
//# sourceMappingURL=tree-node.js.map
