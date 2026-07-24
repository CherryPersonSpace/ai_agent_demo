function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState } from "react";
import { ConfigProvider, Modal, Image as ImageViewer } from 'antd';
import { useProviderContext } from "../../..";
import { SparkFalseLine, SparkPlayCircleFill } from "@agentscope-ai/icons";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function (props) {
  try {
    var src = props.src;
    var url = new URL(src);
    var pathname = url.pathname;
    var isVideo = pathname.endsWith(".mp4");
    var isAudio = pathname.endsWith(".mp3") || pathname.endsWith(".wav");
    if (isAudio) {
      return /*#__PURE__*/_jsx("audio", _objectSpread(_objectSpread({
        src: props.src
      }, props), {}, {
        controls: true
      }));
    }
    if (isVideo) {
      return /*#__PURE__*/_jsx(Video, _objectSpread({
        src: props.src
      }, props));
    }
    return /*#__PURE__*/_jsx(Image, _objectSpread({
      src: props.src
    }, props));
  } catch (error) {
    return null;
  }
}
function Image(props) {
  return /*#__PURE__*/_jsx(ConfigProvider, {
    locale: {
      Image: {
        preview: ''
      }
    },
    children: /*#__PURE__*/_jsx(ImageViewer, _objectSpread({
      src: props.src
    }, props))
  });
}
function Video(props) {
  var src = props.src;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var prefixCls = getPrefixCls('markdown-video');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: prefixCls,
      children: /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-poster"),
        onClick: function onClick() {
          return setOpen(true);
        },
        children: /*#__PURE__*/_jsx(SparkPlayCircleFill, {
          className: "".concat(prefixCls, "-play")
        })
      })
    }), /*#__PURE__*/_jsx(Modal, {
      closeIcon: /*#__PURE__*/_jsx("a", {
        children: /*#__PURE__*/_jsx(SparkFalseLine, {
          style: {
            fontSize: 20
          }
        })
      }),
      centered: true,
      transitionName: "",
      footer: null,
      width: 500,
      title: "",
      styles: {
        content: {
          padding: 0
        }
      },
      open: open,
      destroyOnHidden: true,
      onCancel: function onCancel() {
        return setOpen(false);
      },
      children: /*#__PURE__*/_jsx("video", {
        controls: true,
        autoPlay: true,
        style: {
          display: 'block',
          width: '100%'
        },
        children: /*#__PURE__*/_jsx("source", {
          src: src,
          type: "video/mp4"
        })
      })
    })]
  });
}