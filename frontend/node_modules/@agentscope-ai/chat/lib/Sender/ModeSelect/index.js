function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _templateObject;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import React, { useMemo } from "react";
import { createGlobalStyle } from 'antd-style';
import { useProviderContext } from "../..";
import { SparkFalseLine } from "@agentscope-ai/icons";
import { Tooltip } from "@agentscope-ai/design";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var Style = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.", "-sender-mode-select {\n  position: relative;\n  height: 40px;\n\n  &-options {\n    position: absolute;\n    top: 4px;\n    left: 0;\n    right: 0;\n    display: flex;\n    gap: 8px;\n    transition: all 0.3s;\n  }\n\n  &-option {\n    height: 28px;\n    display: flex;\n    align-items: center;\n    fonts: 14px;\n    padding: 0 8px;\n    border-radius: ", "px;\n    gap: 4px;\n    border: 1px solid ", ";\n    cursor: pointer;\n    color: ", ";\n    transition: all 0.3s;\n\n    &:hover {\n      border-color: ", ";\n      color: ", ";\n    }\n  }\n\n  &-display {\n    position: absolute;\n    top: 8px;\n    left: 0;\n    right: 0;\n    height: 40px;\n    border: 1px solid ", ";\n    border-radius: ", "px ", "px 0 0;\n    background: ", ";\n    transition: all 0.3s;\n\n    &-flex {\n      display: flex;\n      justify-content: space-between; \n      align-items: center;\n      height: 32px;\n      padding: 0 12px;\n    }\n\n    &-label {\n      width: 0;\n      flex: 1;\n      display: flex;\n      align-items: center;\n      gap: 4px;\n      fontsize: 14px;\n      color: ", ";\n    }\n\n    &-desc {\n      display: flex;\n      align-items: center;\n      margin: 0 12px 0 auto;\n    }\n  }\n\n  &-hide {\n    top: 45px;\n  }\n}\n\n"])), function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.borderRadius;
}, function (p) {
  return p.theme.colorBorderSecondary;
}, function (p) {
  return p.theme.colorTextSecondary;
}, function (p) {
  return p.theme.colorPrimary;
}, function (p) {
  return p.theme.colorPrimary;
}, function (p) {
  return p.theme.colorBorderSecondary;
}, function (p) {
  return p.theme.borderRadiusLG;
}, function (p) {
  return p.theme.borderRadiusLG;
}, function (p) {
  return p.theme.colorFillTertiary;
}, function (p) {
  return p.theme.colorTextSecondary;
});
export default function (props) {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('sender-mode-select');
  var value = props.value,
    onChange = props.onChange;
  var valueObject = useMemo(function () {
    var item = props.options.find(function (item) {
      return item.value === value;
    }) || {};
    return item;
  }, [props.value]);
  var close = /*#__PURE__*/_jsx(SparkFalseLine, {
    onClick: function onClick() {
      return onChange(undefined);
    },
    style: {
      cursor: 'pointer',
      fontSize: 20
    }
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsxs("div", {
      className: prefixCls,
      style: props.style,
      children: [/*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-options ").concat(value ? "".concat(prefixCls, "-hide") : ''),
        children: props.options.map(function (item) {
          var node = /*#__PURE__*/_jsx(Display, _objectSpread({
            onClick: function onClick() {
              return onChange(item.value);
            },
            className: "".concat(prefixCls, "-option")
          }, item), item.value);
          return node;
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-display ").concat(value ? '' : "".concat(prefixCls, "-hide")),
        children: /*#__PURE__*/_jsxs("div", {
          className: "".concat(prefixCls, "-display-flex"),
          children: [/*#__PURE__*/_jsx(Display, _objectSpread(_objectSpread({}, valueObject), {}, {
            label: (valueObject === null || valueObject === void 0 ? void 0 : valueObject.selectedLabel) || (valueObject === null || valueObject === void 0 ? void 0 : valueObject.label),
            className: "".concat(prefixCls, "-display-label")
          })), props.desc && /*#__PURE__*/_jsx("div", {
            className: "".concat(prefixCls, "-display-desc"),
            children: props.desc
          }), props.closeTip ? /*#__PURE__*/_jsx(Tooltip, {
            title: props.closeTip,
            children: close
          }) : close]
        })
      })]
    })]
  });
}
function Display(props) {
  var node = /*#__PURE__*/_jsxs("div", {
    className: props.className,
    onClick: props.onClick,
    children: [props.icon, props.label]
  });
  if (props.tooltip) {
    return /*#__PURE__*/_jsx(Tooltip, {
      title: props.tooltip,
      placement: "topLeft",
      children: node
    });
  } else {
    return node;
  }
}