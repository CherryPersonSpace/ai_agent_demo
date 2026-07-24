function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _templateObject;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { createGlobalStyle } from 'antd-style';
import { useProviderContext } from "../../../..";
import { Popover } from 'antd';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Style = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.", "-markdown-citation {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 16px;\n  padding: 0 4px;\n  height: 16px;\n  margin-inline: 2px;\n  font-size: 10px;\n  color: ", ";\n  text-align: center;\n  vertical-align: top;\n  background: ", ";\n  border-radius: 4px;\n  transition: all 100ms ", ";\n  cursor: pointer;\n  line-height: 1;\n\n  &:hover {\n    color: ", ";\n    background: ", ";\n  }\n}\n"])), function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorTextSecondary;
}, function (p) {
  return p.theme.colorFillSecondary;
}, function (p) {
  return p.theme.motionEaseOut;
}, function (p) {
  return p.theme.colorWhite;
}, function (p) {
  return p.theme.colorPrimary;
});
function DefaultRender(props) {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('markdown-citation');
  var text = props['data-text'];
  var url = props['data-url'];
  var title = props['data-title'];
  var content = props['data-content'];
  var isTooltip = content || title;
  var node = /*#__PURE__*/_jsx("sup", {
    className: prefixCls,
    children: text
  });
  if (isTooltip) {
    node = /*#__PURE__*/_jsx(Popover, {
      title: title,
      content: url ? /*#__PURE__*/_jsx("a", {
        href: url,
        rel: "noreferrer",
        target: '_blank',
        children: url
      }) : content,
      children: node
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), node]
  });
}
export default function CitationComponent(props) {
  var _props$citationsData$;
  var Render = ((_props$citationsData$ = props.citationsData[props['data-text']]) === null || _props$citationsData$ === void 0 ? void 0 : _props$citationsData$.render) || DefaultRender;
  return /*#__PURE__*/_jsx(Render, _objectSpread({}, props));
}