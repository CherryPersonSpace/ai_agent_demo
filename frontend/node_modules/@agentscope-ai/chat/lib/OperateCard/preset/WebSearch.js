function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { OperateCard, useProviderContext } from "../..";
import { SparkSearchLine } from '@agentscope-ai/icons';
import classNames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function (props) {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('operate-card');
  var _props$title = props.title,
    title = _props$title === void 0 ? '联网搜索' : _props$title,
    subTitle = props.subTitle;
  return /*#__PURE__*/_jsx(OperateCard, {
    header: {
      icon: /*#__PURE__*/_jsx(SparkSearchLine, {}),
      title: title,
      description: subTitle
    },
    body: {
      defaultOpen: true,
      children: /*#__PURE__*/_jsx(OperateCard.LineBody, {
        children: props.list.map(function (item) {
          return /*#__PURE__*/_jsxs("div", {
            className: classNames(_defineProperty({}, "".concat(prefixCls, "-web-search-item"), true)),
            onClick: function onClick() {
              window.open(item.link, '_blank');
            },
            children: [/*#__PURE__*/_jsx("img", {
              className: "".concat(prefixCls, "-web-search-item-icon"),
              src: item.icon,
              alt: item.title
            }), /*#__PURE__*/_jsx("div", {
              className: "".concat(prefixCls, "-web-search-item-title"),
              children: item.title
            }), item.subTitle && /*#__PURE__*/_jsx("div", {
              className: "".concat(prefixCls, "-web-search-item-subTitle"),
              children: item.subTitle
            })]
          }, item.title);
        })
      })
    }
  });
}