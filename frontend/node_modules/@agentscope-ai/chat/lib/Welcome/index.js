var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import React from 'react';
import { createGlobalStyle } from 'antd-style';
import { useProviderContext } from "./..";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var Style = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.", "-welcome {\n  display: flex;\n  align-items: center;\n\n  &-logo {\n    display: block;\n    margin-right: 20px;\n  }\n\n  &-title {\n    font-size: 24px;\n    line-height: 36px;\n    font-weight: bold;\n    color: ", ";\n  }\n\n  &-desc {\n    margin-top: 4px;\n    font-size: 24px;\n    line-height: 36px;\n    color: ", ";\n  }\n}\n"])), function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorText;
}, function (p) {
  return p.theme.colorTextSecondary;
});
export default function (props) {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefix = getPrefixCls('welcome');
  var logoEle = typeof props.logo === 'string' ? /*#__PURE__*/_jsx("img", {
    className: prefix + '-logo',
    src: props.logo
  }) : props.logo;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsxs("div", {
      className: prefix,
      style: props.style,
      children: [logoEle, /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("div", {
          className: prefix + '-title',
          children: props.title
        }), /*#__PURE__*/_jsx("div", {
          className: prefix + '-desc',
          children: props.desc
        })]
      })]
    })]
  });
}