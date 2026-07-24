function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { OperateCard, useProviderContext } from "../..";
import { SparkCheckCircleLine, SparkLoadingLine, SparkProjectNoLine } from '@agentscope-ai/icons';
import classNames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function (props) {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('operate-card');
  var _props$title = props.title,
    title = _props$title === void 0 ? 'Task List' : _props$title;
  var doneCount = props.list.filter(function (item) {
    return item.status === 'done';
  }).length;
  return /*#__PURE__*/_jsx(OperateCard, {
    header: {
      icon: /*#__PURE__*/_jsx(SparkProjectNoLine, {}),
      title: title,
      description: "\xB7 ".concat(doneCount ? doneCount + ' of ' : '', " ").concat(props.list.length)
    },
    body: {
      defaultOpen: props.defaultOpen,
      children: /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-todo-list"),
        children: props.list.map(function (item) {
          return /*#__PURE__*/_jsxs("div", {
            className: classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-todo-list-item"), true), "".concat(prefixCls, "-todo-list-item-").concat(item.status), true)),
            children: [/*#__PURE__*/_jsx("div", {
              className: "".concat(prefixCls, "-todo-list-item-icon"),
              children: {
                'done': /*#__PURE__*/_jsx(SparkCheckCircleLine, {}),
                'todo': /*#__PURE__*/_jsx(SparkCheckCircleLine, {}),
                'running': /*#__PURE__*/_jsx(SparkLoadingLine, {
                  spin: true
                })
              }[item.status]
            }), /*#__PURE__*/_jsx("div", {
              className: "".concat(prefixCls, "-todo-list-item-title"),
              style: {
                textDecoration: item.status === 'done' ? 'line-through' : 'none'
              },
              children: item.title
            })]
          }, item.title);
        })
      })
    }
  });
}