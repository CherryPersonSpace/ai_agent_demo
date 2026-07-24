var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { useProviderContext } from "../../../..";
import classNames from 'classnames';
import { createGlobalStyle } from 'antd-style';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Style = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.markdown-cursor-underline {\n  opacity: 1;\n  padding: 0 2px;\n  animation: markdown-cursor-underline .8s infinite;\n\n  &::after {\n    content: '_';\n    color: ", ";\n  }\n}\n\n\n@keyframes markdown-cursor-underline {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n  }\n}\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.colorPrimary;
});
export default function () {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = 'markdown-cursor-underline';
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsx("span", {
      className: classNames(prefixCls, getPrefixCls('markdown-cursor'))
    })]
  });
}