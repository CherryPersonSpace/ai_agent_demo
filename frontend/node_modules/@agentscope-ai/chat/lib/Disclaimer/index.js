import React from 'react';
import Style from "./style";
import { useProviderContext } from "./..";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function (props) {
  var _props$desc = props.desc,
    desc = _props$desc === void 0 ? 'AI can also make mistakes, so please check carefully and use it with caution' : _props$desc;
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('disclaimer');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsxs("div", {
      className: prefixCls,
      style: props.style,
      children: [desc, props.afterLink && /*#__PURE__*/_jsx("a", {
        className: "".concat(prefixCls, "-after-link"),
        href: props.afterLink.href,
        target: "_blank",
        children: props.afterLink.text
      })]
    })]
  });
}