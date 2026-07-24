function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import { Avatar } from 'antd';
import { useProviderContext } from "./..";
import { SparkRightArrowLine } from '@agentscope-ai/icons';
import Style from "./style";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function WelcomePrompts(props) {
  var greeting = props.greeting,
    avatar = props.avatar,
    description = props.description,
    prompts = props.prompts,
    onClick = props.onClick;
  var prefixCls = useProviderContext().getPrefixCls('welcome-prompts');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsxs("div", {
      className: prefixCls,
      children: [avatar && (typeof avatar === 'string' ? /*#__PURE__*/_jsx(Avatar, {
        src: avatar,
        shape: "square",
        size: 64
      }) : avatar), greeting && /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-greeting"),
        children: greeting
      }), description && /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-description"),
        children: description
      }), (prompts === null || prompts === void 0 ? void 0 : prompts.length) > 0 && /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-prompts"),
        children: prompts.map(function (item) {
          var prompt = typeof item === 'string' ? {
            label: item,
            value: item
          } : _objectSpread(_objectSpread({}, item), {}, {
            label: item.label || item.value,
            value: item.value
          });
          return /*#__PURE__*/_jsx(Prompt, {
            prompt: prompt,
            prefixCls: prefixCls,
            onClick: onClick
          }, prompt.value);
        })
      })]
    })]
  });
}
function Prompt(props) {
  var prefixCls = props.prefixCls;
  return /*#__PURE__*/_jsxs("div", {
    className: "".concat(prefixCls, "-prompt"),
    onClick: function onClick() {
      var _props$onClick;
      return (_props$onClick = props.onClick) === null || _props$onClick === void 0 ? void 0 : _props$onClick.call(props, props.prompt.value);
    },
    children: [/*#__PURE__*/_jsx("img", {
      className: "".concat(prefixCls, "-prompt-icon"),
      src: "https://img.alicdn.com/imgextra/i3/O1CN01822qqr1PVyaK7MYtn_!!6000000001847-2-tps-40-40.png",
      alt: ""
    }), /*#__PURE__*/_jsx("span", {
      className: "".concat(prefixCls, "-prompt-label"),
      children: props.prompt.label
    }), /*#__PURE__*/_jsx(SparkRightArrowLine, {})]
  });
}