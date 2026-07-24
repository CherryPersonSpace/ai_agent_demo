function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["instance", "children", "resize", "initial", "mass", "damping", "stiffness", "targetScrollTop", "contextRef"],
  _excluded2 = ["children", "scrollClassName"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/*!---------------------------------------------------------------------------------------------
 *  Copyright (c) StackBlitz. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { createContext, useContext, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import { useStickToBottom } from "./useStickToBottom";
import { jsx as _jsx } from "react/jsx-runtime";
var StickToBottomContext = /*#__PURE__*/createContext(null);
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
export function StickToBottom(_ref) {
  var instance = _ref.instance,
    children = _ref.children,
    resize = _ref.resize,
    initial = _ref.initial,
    mass = _ref.mass,
    damping = _ref.damping,
    stiffness = _ref.stiffness,
    currentTargetScrollTop = _ref.targetScrollTop,
    contextRef = _ref.contextRef,
    props = _objectWithoutProperties(_ref, _excluded);
  var customTargetScrollTop = useRef(null);
  var targetScrollTop = React.useCallback(function (target, elements) {
    var _context$targetScroll, _get;
    var get = (_context$targetScroll = context === null || context === void 0 ? void 0 : context.targetScrollTop) !== null && _context$targetScroll !== void 0 ? _context$targetScroll : currentTargetScrollTop;
    return (_get = get === null || get === void 0 ? void 0 : get(target, elements)) !== null && _get !== void 0 ? _get : target;
  }, [currentTargetScrollTop]);
  var _props$enabled = props.enabled,
    enabled = _props$enabled === void 0 ? true : _props$enabled;
  var defaultInstance = useStickToBottom({
    enabled: enabled,
    mass: mass,
    damping: damping,
    stiffness: stiffness,
    resize: resize,
    initial: initial,
    targetScrollTop: targetScrollTop
  });
  var _ref2 = instance !== null && instance !== void 0 ? instance : defaultInstance,
    scrollRef = _ref2.scrollRef,
    contentRef = _ref2.contentRef,
    scrollToBottom = _ref2.scrollToBottom,
    stopScroll = _ref2.stopScroll,
    isAtBottom = _ref2.isAtBottom,
    escapedFromLock = _ref2.escapedFromLock,
    state = _ref2.state;
  var context = useMemo(function () {
    return {
      scrollToBottom: scrollToBottom,
      stopScroll: stopScroll,
      scrollRef: scrollRef,
      isAtBottom: isAtBottom,
      escapedFromLock: escapedFromLock,
      contentRef: contentRef,
      state: state,
      get targetScrollTop() {
        return customTargetScrollTop.current;
      },
      set targetScrollTop(targetScrollTop) {
        customTargetScrollTop.current = targetScrollTop;
      }
    };
  }, [scrollToBottom, isAtBottom, contentRef, scrollRef, stopScroll, escapedFromLock, state]);
  useImperativeHandle(contextRef, function () {
    return context;
  }, [context]);
  useIsomorphicLayoutEffect(function () {
    if (!scrollRef.current) {
      return;
    }
    if (getComputedStyle(scrollRef.current).overflow === "visible") {
      scrollRef.current.style.overflow = "auto";
    }
  }, []);
  return /*#__PURE__*/_jsx(StickToBottomContext.Provider, {
    value: context,
    children: /*#__PURE__*/_jsx("div", _objectSpread(_objectSpread({}, props), {}, {
      children: typeof children === "function" ? children(context) : children
    }))
  });
}
(function (_StickToBottom) {
  function Content(_ref3) {
    var children = _ref3.children,
      scrollClassName = _ref3.scrollClassName,
      props = _objectWithoutProperties(_ref3, _excluded2);
    var context = useStickToBottomContext();
    return /*#__PURE__*/_jsx("div", {
      ref: context.scrollRef,
      style: {
        height: "100%",
        width: "100%",
        scrollbarGutter: "stable both-edges"
      },
      className: scrollClassName,
      children: /*#__PURE__*/_jsx("div", _objectSpread(_objectSpread({}, props), {}, {
        ref: context.contentRef,
        children: typeof children === "function" ? children(context) : children
      }))
    });
  }
  _StickToBottom.Content = Content;
})(StickToBottom || (StickToBottom = {}));
/**
 * Use this hook inside a <StickToBottom> component to gain access to whether the component is at the bottom of the scrollable area.
 */
export function useStickToBottomContext() {
  var context = useContext(StickToBottomContext);
  if (!context) {
    throw new Error("use-stick-to-bottom component context must be used within a StickToBottom component");
  }
  return context;
}