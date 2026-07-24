import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SIZE = 1000;
var COUNT = 4;
var RECT_WIDTH = 140;
var RECT_RADIUS = RECT_WIDTH / 2;
var RECT_HEIGHT_MIN = 250;
var RECT_HEIGHT_MAX = 500;
var DURATION = 0.8;
export default function RecordingIcon(_ref) {
  var className = _ref.className;
  return /*#__PURE__*/_jsxs("svg", {
    color: "currentColor",
    viewBox: "0 0 ".concat(SIZE, " ").concat(SIZE),
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    className: className,
    children: [/*#__PURE__*/_jsx("title", {
      children: "Speech Recording"
    }), Array.from({
      length: COUNT
    }).map(function (_, index) {
      var dest = (SIZE - RECT_WIDTH * COUNT) / (COUNT - 1);
      var x = index * (dest + RECT_WIDTH);
      var yMin = SIZE / 2 - RECT_HEIGHT_MIN / 2;
      var yMax = SIZE / 2 - RECT_HEIGHT_MAX / 2;
      return /*#__PURE__*/_jsxs("rect", {
        fill: "currentColor",
        rx: RECT_RADIUS,
        ry: RECT_RADIUS,
        height: RECT_HEIGHT_MIN,
        width: RECT_WIDTH,
        x: x,
        y: yMin,
        children: [/*#__PURE__*/_jsx("animate", {
          attributeName: "height",
          values: "".concat(RECT_HEIGHT_MIN, "; ").concat(RECT_HEIGHT_MAX, "; ").concat(RECT_HEIGHT_MIN),
          keyTimes: "0; 0.5; 1",
          dur: "".concat(DURATION, "s"),
          begin: "".concat(DURATION / COUNT * index, "s"),
          repeatCount: "indefinite"
        }), /*#__PURE__*/_jsx("animate", {
          attributeName: "y",
          values: "".concat(yMin, "; ").concat(yMax, "; ").concat(yMin),
          keyTimes: "0; 0.5; 1",
          dur: "".concat(DURATION, "s"),
          begin: "".concat(DURATION / COUNT * index, "s"),
          repeatCount: "indefinite"
        })]
      }, index);
    })]
  });
}