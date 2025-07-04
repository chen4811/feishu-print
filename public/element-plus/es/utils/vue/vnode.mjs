import { isVNode, Fragment, Text, Comment, openBlock, createBlock, createCommentVNode } from 'vue';
import { isArray, hasOwn, camelize } from '@vue/shared';
import { debugWarn } from '../error.mjs';

const SCOPE = "utils/vue/vnode";
var PatchFlags = /* @__PURE__ */ ((PatchFlags2) => {
  PatchFlags2[PatchFlags2["TEXT"] = 1] = "TEXT";
  PatchFlags2[PatchFlags2["CLASS"] = 2] = "CLASS";
  PatchFlags2[PatchFlags2["STYLE"] = 4] = "STYLE";
  PatchFlags2[PatchFlags2["PROPS"] = 8] = "PROPS";
  PatchFlags2[PatchFlags2["FULL_PROPS"] = 16] = "FULL_PROPS";
  PatchFlags2[PatchFlags2["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
  PatchFlags2[PatchFlags2["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
  PatchFlags2[PatchFlags2["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
  PatchFlags2[PatchFlags2["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
  PatchFlags2[PatchFlags2["NEED_PATCH"] = 512] = "NEED_PATCH";
  PatchFlags2[PatchFlags2["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
  PatchFlags2[PatchFlags2["HOISTED"] = -1] = "HOISTED";
  PatchFlags2[PatchFlags2["BAIL"] = -2] = "BAIL";
  return PatchFlags2;
})(PatchFlags || {});
function isFragment(node) {
  return isVNode(node) && node.type === Fragment;
}
function isText(node) {
  return isVNode(node) && node.type === Text;
}
function isComment(node) {
  return isVNode(node) && node.type === Comment;
}
const TEMPLATE = "template";
function isTemplate(node) {
  return isVNode(node) && node.type === TEMPLATE;
}
function isValidElementNode(node) {
  return isVNode(node) && !isFragment(node) && !isComment(node);
}
function getChildren(node, depth) {
  if (isComment(node))
    return;
  if (isFragment(node) || isTemplate(node)) {
    return depth > 0 ? getFirstValidNode(node.children, depth - 1) : void 0;
  }
  return node;
}
const getFirstValidNode = (nodes, maxDepth = 3) => {
  if (isArray(nodes)) {
    return getChildren(nodes[0], maxDepth);
  } else {
    return getChildren(nodes, maxDepth);
  }
};
function renderIf(condition, ...args) {
  return condition ? renderBlock(...args) : createCommentVNode("v-if", true);
}
function renderBlock(...args) {
  return openBlock(), createBlock(...args);
}
const getNormalizedProps = (node) => {
  if (!isVNode(node)) {
    debugWarn(SCOPE, "[getNormalizedProps] must be a VNode");
    return {};
  }
  const raw = node.props || {};
  const type = (isVNode(node.type) ? node.type.props : void 0) || {};
  const props = {};
  Object.keys(type).forEach((key) => {
    if (hasOwn(type[key], "default")) {
      props[key] = type[key].default;
    }
  });
  Object.keys(raw).forEach((key) => {
    props[camelize(key)] = raw[key];
  });
  return props;
};
const ensureOnlyChild = (children) => {
  if (!isArray(children) || children.length > 1) {
    throw new Error("expect to receive a single Vue element child");
  }
  return children[0];
};
const flattedChildren = (children) => {
  const vNodes = isArray(children) ? children : [children];
  const result = [];
  vNodes.forEach((child) => {
    var _a;
    if (isArray(child)) {
      result.push(...flattedChildren(child));
    } else if (isVNode(child) && ((_a = child.component) == null ? void 0 : _a.subTree)) {
      result.push(child, ...flattedChildren(child.component.subTree));
    } else if (isVNode(child) && isArray(child.children)) {
      result.push(...flattedChildren(child.children));
    } else if (isVNode(child) && child.shapeFlag === 2) {
      result.push(...flattedChildren(child.type()));
    } else {
      result.push(child);
    }
  });
  return result;
};

export { PatchFlags, ensureOnlyChild, flattedChildren, getFirstValidNode, getNormalizedProps, isComment, isFragment, isTemplate, isText, isValidElementNode, renderBlock, renderIf };
//# sourceMappingURL=vnode.mjs.map
