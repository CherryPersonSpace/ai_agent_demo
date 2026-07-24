import { OperateCard, useProviderContext } from "./..";
import { ConfigProvider, Image } from 'antd';
import actionMap from "./actionMap";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function (props) {
  var _actionMap$props$acti, _actionMap$props$acti2;
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('operate-card');
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("div", {
      className: "".concat(prefixCls, "-device-action-time"),
      children: props.time
    }), /*#__PURE__*/_jsx(OperateCard, {
      header: {
        className: "".concat(prefixCls, "-device-action"),
        icon: /*#__PURE__*/_jsx("div", {
          className: "".concat(prefixCls, "-device-action-icon"),
          children: (_actionMap$props$acti = actionMap[props.action]) === null || _actionMap$props$acti === void 0 ? void 0 : _actionMap$props$acti.icon
        }),
        title: /*#__PURE__*/_jsxs("div", {
          className: "".concat(prefixCls, "-device-action-content"),
          children: [/*#__PURE__*/_jsxs("div", {
            className: "".concat(prefixCls, "-device-action-description"),
            children: [/*#__PURE__*/_jsx("span", {
              children: props.actionName || ((_actionMap$props$acti2 = actionMap[props.action]) === null || _actionMap$props$acti2 === void 0 ? void 0 : _actionMap$props$acti2.name)
            }), /*#__PURE__*/_jsx("span", {
              children: props.description
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "".concat(prefixCls, "-device-action-image"),
            children: /*#__PURE__*/_jsx(ConfigProvider, {
              locale: {
                Image: {
                  preview: ''
                }
              },
              children: /*#__PURE__*/_jsx(Image, {
                src: props.image,
                alt: props.description,
                width: '100%',
                height: '100%'
              })
            })
          })]
        })
      }
    })]
  });
}