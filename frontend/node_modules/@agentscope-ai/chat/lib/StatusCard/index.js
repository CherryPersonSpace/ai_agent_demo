import { SparkCheckCircleFill, SparkErrorCircleFill, SparkStopCircleLine, SparkTrueLine, SparkWarningCircleFill } from '@agentscope-ai/icons';
import { useProviderContext } from "../Provider";
import Style from "./style";
import classNames from 'classnames';
import { Button } from '@agentscope-ai/design';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function StatusCard(props) {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('status-card');
  var icon = props.icon || {
    'success': /*#__PURE__*/_jsx(SparkCheckCircleFill, {}),
    'error': /*#__PURE__*/_jsx(SparkErrorCircleFill, {}),
    'warning': /*#__PURE__*/_jsx(SparkStopCircleLine, {}),
    'info': /*#__PURE__*/_jsx(SparkWarningCircleFill, {})
  }[props.status];
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsxs("div", {
      className: classNames(prefixCls, "".concat(prefixCls, "-").concat(props.status)),
      children: [/*#__PURE__*/_jsxs("div", {
        className: "".concat(prefixCls, "-header"),
        children: [/*#__PURE__*/_jsxs("div", {
          className: "".concat(prefixCls, "-header-top"),
          children: [/*#__PURE__*/_jsx("div", {
            className: "".concat(prefixCls, "-header-icon"),
            children: icon
          }), /*#__PURE__*/_jsx("div", {
            className: "".concat(prefixCls, "-header-title"),
            children: props.title
          })]
        }), props.description && /*#__PURE__*/_jsx("div", {
          className: "".concat(prefixCls, "-header-description"),
          children: props.description
        })]
      }), props.children && /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-body"),
        children: props.children
      })]
    })]
  });
}
StatusCard.HITL = function (props) {
  var _props$title = props.title,
    title = _props$title === void 0 ? '需要用户人工干预' : _props$title,
    description = props.description,
    _props$waitButtonText = props.waitButtonText,
    waitButtonText = _props$waitButtonText === void 0 ? '我已完成，继续任务' : _props$waitButtonText,
    _props$doneButtonText = props.doneButtonText,
    doneButtonText = _props$doneButtonText === void 0 ? '用户已确认' : _props$doneButtonText;
  var _useProviderContext2 = useProviderContext(),
    getPrefixCls = _useProviderContext2.getPrefixCls;
  var prefixCls = getPrefixCls('status-card');
  var button = props.actions !== undefined ? props.actions : props.done ? /*#__PURE__*/_jsx(Button, {
    onClick: props.onDone,
    type: "primary",
    disabled: true,
    icon: /*#__PURE__*/_jsx(SparkTrueLine, {}),
    children: doneButtonText
  }) : /*#__PURE__*/_jsx(Button, {
    onClick: props.onDone,
    type: "primary",
    children: waitButtonText
  });
  return /*#__PURE__*/_jsx(StatusCard, {
    status: props.done ? 'success' : 'info',
    title: title,
    children: description || button ? /*#__PURE__*/_jsxs("div", {
      className: "".concat(prefixCls, "-HITL"),
      children: [description && /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-HITL-desc"),
        children: description
      }), /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-HITL-button"),
        children: button
      })]
    }) : null
  });
};
StatusCard.Statistic = function (props) {
  var _useProviderContext3 = useProviderContext(),
    getPrefixCls = _useProviderContext3.getPrefixCls;
  var prefixCls = getPrefixCls('status-card');
  return /*#__PURE__*/_jsx("div", {
    className: "".concat(prefixCls, "-statistic"),
    children: props.values.map(function (item) {
      return /*#__PURE__*/_jsxs("div", {
        className: "".concat(prefixCls, "-statistic-item"),
        children: [/*#__PURE__*/_jsx("div", {
          className: "".concat(prefixCls, "-statistic-item-title"),
          children: item.title
        }), /*#__PURE__*/_jsx("div", {
          className: "".concat(prefixCls, "-statistic-item-value"),
          children: item.value
        })]
      });
    })
  });
};
export default StatusCard;