var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { useProviderContext } from "../../../..";
import { createGlobalStyle } from 'antd-style';
import classNames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var Style = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.", "-markdown-cursor-dot {\n  display: inline-flex;\n  width: 0;\n  align-items: center;\n  padding-left: 2px;\n  gap: 4px;\n\n\n  &-dot1 {\n    flex: 0 0 5px;\n    width: 5px;\n    height: 5px;\n    border-radius: 999px;\n    background-color: ", ";\n    animation: markdown-cursor-dot1 2s infinite ease;\n  }\n\n\n  &-dot2 {\n    flex: 0 0 5px;\n    width: 5px;\n    height: 5px;\n    border-radius: 999px;\n    opacity: 0.5;\n    background-color: ", ";\n    animation: markdown-cursor-dot2 2s infinite ease;\n  }\n\n}\n\n\n@keyframes markdown-cursor-dot1 {\n  0% {\n    transform: translateX(0px)scale(1);\n    z-index: 1;\n    opacity: 1;\n\n  }\n\n  40% {\n    transform: translateX(8.5px)scale(0.8);\n    z-index: 3;\n    opacity: 0.5;\n\n  }\n\n  50% {\n    transform: translateX(8.5px) scale(0.8);\n    z-index: 1;\n    opacity: 0.5;\n  }\n\n  90% {\n    transform: translateX(0px) scale(1);\n    z-index: 1;\n    opacity: 1;\n  }\n}\n\n@keyframes markdown-cursor-dot2 {\n  0% {\n    transform: translateX(0px)scale(1);\n    z-index: 1;\n    opacity: 0.5;\n\n  }\n\n  40% {\n    transform: translateX(-8.5px)scale(1.25);\n    z-index: 3;\n    opacity: 1;\n\n  }\n\n  50% {\n    transform: translateX(-8.5px) scale(1.25);\n    z-index: 1;\n    opacity: 1;\n  }\n\n  90% {\n    transform: translateX(0px) scale(1);\n    z-index: 1;\n    opacity: 0.5;\n  }\n}\n"])), function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorText;
}, function (p) {
  return p.theme.colorText;
});
export default function () {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('markdown-cursor-dot');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsxs("span", {
      className: classNames(prefixCls, getPrefixCls('markdown-cursor')),
      children: [/*#__PURE__*/_jsx("span", {
        style: {
          opacity: 0,
          marginLeft: '-.75em'
        },
        children: "_"
      }), /*#__PURE__*/_jsx("span", {
        className: "".concat(prefixCls, "-dot1")
      }), /*#__PURE__*/_jsx("span", {
        className: "".concat(prefixCls, "-dot2")
      })]
    })]
  });
}