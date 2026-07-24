function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { CloseOutlined } from "@agentscope-ai/icons-override-antd";
import { Button } from 'antd';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var SendHeaderContext = /*#__PURE__*/React.createContext({});
var collapseHeight = function collapseHeight() {
  return {
    height: 0
  };
};
var expandedHeight = function expandedHeight(ele) {
  return {
    height: ele.scrollHeight
  };
};
export default function SenderHeader(props) {
  var title = props.title,
    onOpenChange = props.onOpenChange,
    open = props.open,
    _children = props.children,
    className = props.className,
    style = props.style,
    _props$classNames = props.classNames,
    classes = _props$classNames === void 0 ? {} : _props$classNames,
    _props$styles = props.styles,
    styles = _props$styles === void 0 ? {} : _props$styles,
    closable = props.closable,
    forceRender = props.forceRender;
  var _React$useContext = React.useContext(SendHeaderContext),
    prefixCls = _React$useContext.prefixCls;
  var headerCls = "".concat(prefixCls, "-header");
  return /*#__PURE__*/_jsx(CSSMotion, {
    motionEnter: true,
    motionLeave: true,
    motionName: "".concat(headerCls, "-motion"),
    leavedClassName: "".concat(headerCls, "-motion-hidden"),
    onEnterStart: collapseHeight,
    onEnterActive: expandedHeight,
    onLeaveStart: expandedHeight,
    onLeaveActive: collapseHeight,
    visible: open,
    forceRender: forceRender,
    children: function children(_ref) {
      var motionClassName = _ref.className,
        motionStyle = _ref.style;
      return /*#__PURE__*/_jsxs("div", {
        className: classNames(headerCls, motionClassName, className),
        style: _objectSpread(_objectSpread({}, motionStyle), style),
        children: [(closable !== false || title) && /*#__PURE__*/_jsxs("div", {
          className:
          // We follow antd naming standard here.
          // So the header part is use `-header` suffix.
          // Though its little bit weird for double `-header`.
          classNames("".concat(headerCls, "-header"), classes.header),
          style: _objectSpread({}, styles.header),
          children: [/*#__PURE__*/_jsx("div", {
            className: "".concat(headerCls, "-title"),
            children: title
          }), closable !== false && /*#__PURE__*/_jsx("div", {
            className: "".concat(headerCls, "-close"),
            children: /*#__PURE__*/_jsx(Button, {
              type: "text",
              icon: /*#__PURE__*/_jsx(CloseOutlined, {}),
              size: "small",
              onClick: function onClick() {
                onOpenChange === null || onOpenChange === void 0 || onOpenChange(!open);
              }
            })
          })]
        }), _children && /*#__PURE__*/_jsx("div", {
          className: classNames("".concat(headerCls, "-content"), classes.content),
          style: _objectSpread({}, styles.content),
          children: _children
        })]
      });
    }
  });
}