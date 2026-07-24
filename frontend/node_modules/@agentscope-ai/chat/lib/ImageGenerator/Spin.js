import { useEffect, useRef } from 'react';

// 工具函数：合并 className（如果不需要可以删除，直接用 className）
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function cn() {
  for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
    inputs[_key] = arguments[_key];
  }
  return inputs.filter(Boolean).join(' ');
}

/**
 * 流体背景动画组件
 * @param {string} width - 容器宽度，默认 '400px'
 * @param {string} height - 容器高度，默认 '400px'
 * @param {number} speed - 动画速度倍数，默认 1.0
 * @param {string} backgroundColor - 主背景颜色，默认 '#b6a9f8'
 * @param {string[]} colors - 圆形元素颜色数组（4个颜色），默认 ['#c979ee', '#ef788c', '#eb7fc6', '#6d67c8']
 * @param {string[]} ringColors - 环形渐变颜色数组，默认 ['white', 'blue', 'magenta', 'violet', 'lightyellow']
 * @param {string} className - 自定义 CSS 类名
 */
var Spin = function Spin(_ref) {
  var _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? 1.0 : _ref$speed,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? '#b6a9f8' : _ref$backgroundColor,
    _ref$colors = _ref.colors,
    colors = _ref$colors === void 0 ? ['#c979ee', '#ef788c', '#eb7fc6', '#6d67c8'] : _ref$colors,
    _ref$ringColors = _ref.ringColors,
    ringColors = _ref$ringColors === void 0 ? ['white', 'blue', 'magenta', 'violet', 'lightyellow'] : _ref$ringColors,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var containerRef = useRef(null);
  useEffect(function () {
    // 注册 CSS @property（如果浏览器支持）
    if (CSS && CSS.registerProperty) {
      try {
        CSS.registerProperty({
          name: '--a',
          syntax: '<angle>',
          inherits: true,
          initialValue: '0deg'
        });
        CSS.registerProperty({
          name: '--l',
          syntax: '<number>',
          inherits: true,
          initialValue: '0'
        });
        CSS.registerProperty({
          name: '--x',
          syntax: '<length>',
          inherits: false,
          initialValue: '0'
        });
        CSS.registerProperty({
          name: '--y',
          syntax: '<length>',
          inherits: false,
          initialValue: '0'
        });
        CSS.registerProperty({
          name: '--o',
          syntax: '<number>',
          inherits: false,
          initialValue: '0'
        });
        CSS.registerProperty({
          name: '--value',
          syntax: '<angle>',
          inherits: true,
          initialValue: '0deg'
        });
        CSS.registerProperty({
          name: '--width-ratio',
          syntax: '<number>',
          inherits: true,
          initialValue: '0'
        });
        CSS.registerProperty({
          name: '--scale',
          syntax: '<number>',
          inherits: true,
          initialValue: '0'
        });
      } catch (_unused) {
        // 浏览器不支持或已注册，忽略
      }
    }
  }, []);

  // 使用 ResizeObserver 监听容器尺寸变化，动态更新 CSS 变量
  useEffect(function () {
    var container = containerRef.current;
    if (!container) return;
    var updateSize = function updateSize() {
      var rect = container.getBoundingClientRect();
      var size = Math.min(rect.width, rect.height);
      container.style.setProperty('--actual-size', "".concat(size, "px"));
    };

    // 初始设置
    updateSize();

    // 使用 ResizeObserver 监听尺寸变化
    var resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    return function () {
      resizeObserver.disconnect();
    };
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("style", {
      children: "\n        @keyframes ai {\n          from {\n            --a: 360deg;\n            --l: 0.35;\n            --o: 1;\n          }\n          30% {\n            --l: 1.5;\n          }\n          70% {\n            --o: 0.4;\n            --l: 0.05;\n          }\n          98% {\n            --o: 0.7;\n          }\n          to {\n            --a: 0deg;\n            --l: 0.35;\n            --o: 1;\n          }\n        }\n\n        @keyframes ring {\n          from {\n            --value: var(--start);\n            --scale: 1;\n          }\n          50% {\n            --scale: 1.2;\n            --width-ratio: 1.5;\n          }\n          70% {\n            --scale: 1;\n            --value: calc(var(--start) + 180deg);\n            --width-ratio: 1;\n          }\n          80% {\n            --scale: 1.2;\n            --width-ratio: 1.5;\n          }\n          to {\n            --value: calc(var(--start) + 360deg);\n            --scale: 1;\n            --width-ratio: 1;\n          }\n        }\n\n        .fluid-background-container {\n          \n          --s: var(--actual-size);\n          --p: calc(var(--s) / 4);\n          --radius: calc(var(--s) * 0.25);\n          --count: 4;\n          --width: calc(var(--s) * 0.025);\n          --duration: calc(8s / ".concat(speed, ");\n          --ai-duration: calc(5.5s / ").concat(speed, ");\n          \n          --bg-color: color-mix(in srgb, #7b7bf4, transparent 90%);\n          position: absolute;\n          inset: 0;\n          background: radial-gradient(\n              60% 75% at center,\n              var(--bg-color) 50%,\n              transparent 50%\n            ),\n            radial-gradient(75% 60% at center, var(--bg-color) 50%, transparent 50%);\n          overflow: hidden;\n        }\n\n        .fluid-background-container .fluid-inner {\n          overflow: hidden;\n          background: ").concat(backgroundColor, ";\n          width: 100%;\n          height: 100%;\n          position: relative;\n          display: grid;\n          place-items: center;\n        }\n\n        .fluid-background-container .c {\n          opacity: 0.9;\n          position: absolute;\n          width: calc(var(--s) * 0.4);\n          aspect-ratio: 1;\n          border-radius: 50%;\n          --offset-per-item: calc(360deg / var(--count));\n          --current-angle-offset: calc(var(--offset-per-item) * var(--i) + var(--a));\n          translate: calc(\n              cos(var(--current-angle-offset)) * var(--radius) + var(--x, 0)\n            )\n            calc(sin(var(--current-angle-offset)) * var(--radius) * -1);\n          scale: calc(0.6 + var(--l));\n          animation: ai var(--ai-duration) cubic-bezier(0.45, -0.35, 0.16, 1.5) infinite;\n          transition: opacity 0.3s linear;\n          opacity: var(--o, 1);\n        }\n\n        .fluid-background-container .c1 {\n          background: radial-gradient(50% 50% at center, ").concat(colors[0] || '#c979ee', ", color-mix(in srgb, ").concat(colors[0] || '#c979ee', ", transparent 30%));\n          --x: calc(var(--s) * 0.04);\n          width: calc(var(--s) * 0.6);\n          animation-timing-function: cubic-bezier(0.12, 0.32, 0.68, 0.24);\n        }\n\n        .fluid-background-container .c2 {\n          background: radial-gradient(50% 50% at center, ").concat(colors[1] || '#ef788c', ", color-mix(in srgb, ").concat(colors[1] || '#ef788c', ", white 40%));\n          width: calc(var(--s) * 0.55);\n        }\n\n        .fluid-background-container .c3 {\n          background: radial-gradient(50% 50% at center, ").concat(colors[2] || '#eb7fc6', ", transparent);\n          width: calc(var(--s) * 0.2);\n          opacity: 0.6;\n          --x: calc(var(--s) * -0.04);\n        }\n\n        .fluid-background-container .c4 {\n          background: ").concat(colors[3] || '#6d67c8', ";\n          animation-timing-function: cubic-bezier(0.39, -0.03, 0.75, 0.47);\n        }\n\n        .fluid-background-container .glass {\n          overflow: hidden;\n          position: absolute;\n          border-radius: 8px;\n          inset: 0;\n          backdrop-filter: blur(calc(var(--s) * 0.12));\n          box-shadow: 0 0 calc(var(--s) * 0.2) color-mix(in srgb, black, transparent 70%);\n        }\n\n        .fluid-background-container .glass::after {\n          content: \"\";\n          position: absolute;\n          inset: 0;\n          --c: rgba(255, 255, 255, 0.03);\n          --w: 0.0625rem;\n          --g: 0.1875rem;\n          background: repeating-linear-gradient(\n            var(--c),\n            var(--c),\n            var(--w),\n            transparent var(--w),\n            transparent calc(var(--w) + var(--g))\n          );\n        }\n\n        .fluid-background-container .rings {\n          aspect-ratio: 1;\n          border-radius: 50%;\n          position: absolute;\n          inset: 0;\n          perspective: calc(var(--s) * 2.75);\n          opacity: 0.9;\n        }\n\n        .fluid-background-container .rings::before,\n        .fluid-background-container .rings::after {\n          content: \"\";\n          position: absolute;\n          inset: 0;\n          background: rgba(255, 0, 0, 1);\n          border-radius: 50%;\n          --width-ratio: 1;\n          border: calc(var(--width) * var(--width-ratio)) solid transparent;\n          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);\n          background: linear-gradient(\n            ").concat(ringColors.join(', '), "\n          ) border-box;\n          mask-composite: exclude;\n          animation: ring var(--duration) ease-in-out infinite;\n          --start: 180deg;\n          --value: var(--start);\n          --scale: 1;\n          transform: rotateY(var(--value)) rotateX(var(--value)) rotateZ(var(--value))\n            scale(var(--scale));\n        }\n\n        .fluid-background-container .rings::before {\n          --start: 180deg;\n        }\n\n        .fluid-background-container .rings::after {\n          --start: 90deg;\n        }\n      ")
    }), /*#__PURE__*/_jsxs("div", {
      ref: containerRef,
      className: cn('fluid-background-container', className),
      children: [/*#__PURE__*/_jsxs("div", {
        className: "fluid-inner",
        children: [/*#__PURE__*/_jsx("div", {
          className: "c c4",
          style: {
            '--i': 0
          }
        }), /*#__PURE__*/_jsx("div", {
          className: "c c1",
          style: {
            '--i': 1
          }
        }), /*#__PURE__*/_jsx("div", {
          className: "c c2",
          style: {
            '--i': 2
          }
        }), /*#__PURE__*/_jsx("div", {
          className: "c c3",
          style: {
            '--i': 3
          }
        }), /*#__PURE__*/_jsx("div", {
          className: "rings"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "glass"
      })]
    })]
  });
};
export default Spin;