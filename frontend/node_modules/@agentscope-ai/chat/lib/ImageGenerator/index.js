import React from 'react';
import Style from "./style";
import { useProviderContext } from "../Provider";
import { ConfigProvider, Image } from 'antd';
import { SparkCheckCircleFill } from '@agentscope-ai/icons';
import Dot from "../Markdown/core/plugins/cursor/Dot";
import Spin from "./Spin";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var ImageGenerator = function ImageGenerator(props) {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('image-generator');
  var block = props.block,
    skeletonText = props.skeletonText,
    _props$width = props.width,
    width = _props$width === void 0 ? 320 : _props$width,
    _props$height = props.height,
    height = _props$height === void 0 ? 320 : _props$height,
    src = props.src,
    _props$loadingText = props.loadingText,
    loadingText = _props$loadingText === void 0 ? 'Painting...' : _props$loadingText,
    _props$doneText = props.doneText,
    doneText = _props$doneText === void 0 ? 'Paint Completed' : _props$doneText;
  var skeleton = props.skeleton || /*#__PURE__*/_jsxs("div", {
    className: "".concat(prefixCls, "-default-skeleton"),
    style: {
      width: '100%',
      height: '100%'
    },
    children: [/*#__PURE__*/_jsx("div", {
      className: "".concat(prefixCls, "-default-skeleton-bg"),
      children: /*#__PURE__*/_jsx(Spin, {})
    }), /*#__PURE__*/_jsxs("div", {
      className: "".concat(prefixCls, "-default-skeleton-content"),
      children: [/*#__PURE__*/_jsx("img", {
        className: "".concat(prefixCls, "-default-skeleton-icon"),
        src: "https://img.alicdn.com/imgextra/i2/O1CN01M1X8yM1MWUC7u3Go5_!!6000000001442-54-tps-72-72.apng"
      }), skeletonText && /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-default-skeleton-text"),
        children: skeletonText
      })]
    })]
  });
  var loading = !src;
  var size = block ? {
    aspectRatio: "".concat(width, "/").concat(height)
  } : {
    width: width,
    height: height
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Style, {}), /*#__PURE__*/_jsxs("div", {
      className: prefixCls,
      children: [/*#__PURE__*/_jsxs("div", {
        className: "".concat(prefixCls, "-text"),
        children: [loading ? /*#__PURE__*/_jsx(Dot, {}) : /*#__PURE__*/_jsx(SparkCheckCircleFill, {
          className: "".concat(prefixCls, "-text-success")
        }), loading ? /*#__PURE__*/_jsx("span", {
          style: {
            paddingLeft: 20
          },
          children: loadingText
        }) : doneText]
      }), /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-wrapper"),
        style: size,
        children: loading ? skeleton : /*#__PURE__*/_jsx(ConfigProvider, {
          locale: {
            Image: {
              preview: ''
            }
          },
          children: /*#__PURE__*/_jsx(Image, {
            width: '100%',
            height: '100%',
            src: src
          })
        })
      })]
    })]
  });
};
export default ImageGenerator;