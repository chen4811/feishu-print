'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodashUnified = require('lodash-unified');
var node = require('./node2.js');
var types = require('../../../utils/types.js');

const flatNodes = (nodes, leafOnly) => {
  return nodes.reduce((res, node) => {
    if (node.isLeaf) {
      res.push(node);
    } else {
      !leafOnly && res.push(node);
      res = res.concat(flatNodes(node.children, leafOnly));
    }
    return res;
  }, []);
};
class Store {
  constructor(data, config) {
    this.config = config;
    const nodes = (data || []).map((nodeData) => new node["default"](nodeData, this.config));
    this.nodes = nodes;
    this.allNodes = flatNodes(nodes, false);
    this.leafNodes = flatNodes(nodes, true);
  }
  getNodes() {
    return this.nodes;
  }
  getFlattedNodes(leafOnly) {
    return leafOnly ? this.leafNodes : this.allNodes;
  }
  appendNode(nodeData, parentNode) {
    const node$1 = parentNode ? parentNode.appendChild(nodeData) : new node["default"](nodeData, this.config);
    if (!parentNode)
      this.nodes.push(node$1);
    this.appendAllNodesAndLeafNodes(node$1);
  }
  appendNodes(nodeDataList, parentNode) {
    nodeDataList.forEach((nodeData) => this.appendNode(nodeData, parentNode));
  }
  appendAllNodesAndLeafNodes(node) {
    this.allNodes.push(node);
    node.isLeaf && this.leafNodes.push(node);
    if (node.children) {
      node.children.forEach((subNode) => {
        this.appendAllNodesAndLeafNodes(subNode);
      });
    }
  }
  getNodeByValue(value, leafOnly = false) {
    if (types.isPropAbsent(value))
      return null;
    const node = this.getFlattedNodes(leafOnly).find((node2) => lodashUnified.isEqual(node2.value, value) || lodashUnified.isEqual(node2.pathValues, value));
    return node || null;
  }
  getSameNode(node) {
    if (!node)
      return null;
    const node_ = this.getFlattedNodes(false).find(({ value, level }) => lodashUnified.isEqual(node.value, value) && node.level === level);
    return node_ || null;
  }
}

exports["default"] = Store;
//# sourceMappingURL=store.js.map
