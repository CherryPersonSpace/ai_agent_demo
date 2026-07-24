import { useProviderContext } from "../..";
import Style from "./style";
import { useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BeforeUIContainer(_ref) {
  var leftChildren = _ref.leftChildren,
    rightChildren = _ref.rightChildren,
    children = _ref.children;
  var prefixCls = useProviderContext().getPrefixCls('sender-before-ui-container');
  var left = useMemo(function () {
    if (leftChildren) return /*#__PURE__*/_jsx("div", {
      className: "".concat(prefixCls, "-left"),
      children: leftChildren
    });
    return null;
  }, [leftChildren]);
  var right = useMemo(function () {
    if (rightChildren) return /*#__PURE__*/_jsx("div", {
      className: "".concat(prefixCls, "-right"),
      children: rightChildren
    });
    return null;
  }, [rightChildren]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsx("div", {
      className: prefixCls,
      children: /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-content"),
        children: /*#__PURE__*/_jsx("div", {
          className: "".concat(prefixCls, "-content-children"),
          children: children || /*#__PURE__*/_jsxs(_Fragment, {
            children: [left, right]
          })
        })
      })
    })]
  });
}