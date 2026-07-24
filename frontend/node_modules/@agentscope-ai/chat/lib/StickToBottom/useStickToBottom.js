var _globalThis$document, _globalThis$document2, _globalThis$document3;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/*!---------------------------------------------------------------------------------------------
 *  Copyright (c) StackBlitz. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { useCallback, useMemo, useRef, useState } from "react";
var DEFAULT_SPRING_ANIMATION = {
  /**
   * A value from 0 to 1, on how much to damp the animation.
   * 0 means no damping, 1 means full damping.
   *
   * @default 0.7
   */
  damping: 0.7,
  /**
   * The stiffness of how fast/slow the animation gets up to speed.
   *
   * @default 0.05
   */
  stiffness: 0.05,
  /**
   * The inertial mass associated with the animation.
   * Higher numbers make the animation slower.
   *
   * @default 1.25
   */
  mass: 1.25
};
var STICK_TO_BOTTOM_OFFSET_PX = 70;
var SIXTY_FPS_INTERVAL_MS = 1000 / 60;
var RETAIN_ANIMATION_DURATION_MS = 350;
var mouseDown = false;
(_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 || _globalThis$document.addEventListener("mousedown", function () {
  mouseDown = true;
});
(_globalThis$document2 = globalThis.document) === null || _globalThis$document2 === void 0 || _globalThis$document2.addEventListener("mouseup", function () {
  mouseDown = false;
});
(_globalThis$document3 = globalThis.document) === null || _globalThis$document3 === void 0 || _globalThis$document3.addEventListener("click", function () {
  mouseDown = false;
});
export var useStickToBottom = function useStickToBottom() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    escapedFromLock = _useState2[0],
    updateEscapedFromLock = _useState2[1];
  var _useState3 = useState(options.enabled !== false && options.initial !== false),
    _useState4 = _slicedToArray(_useState3, 2),
    isAtBottom = _useState4[0],
    updateIsAtBottom = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isNearBottom = _useState6[0],
    setIsNearBottom = _useState6[1];
  var optionsRef = useRef(null);
  optionsRef.current = options;
  var isSelecting = useCallback(function () {
    var _scrollRef$current;
    if (!mouseDown) {
      return false;
    }
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return false;
    }
    var range = selection.getRangeAt(0);
    return range.commonAncestorContainer.contains(scrollRef.current) || ((_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.contains(range.commonAncestorContainer));
  }, []);
  var setIsAtBottom = useCallback(function (isAtBottom) {
    state.isAtBottom = isAtBottom;
    updateIsAtBottom(isAtBottom);
  }, []);
  var setEscapedFromLock = useCallback(function (escapedFromLock) {
    state.escapedFromLock = escapedFromLock;
    updateEscapedFromLock(escapedFromLock);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed
  var state = useMemo(function () {
    var lastCalculation;
    return {
      escapedFromLock: escapedFromLock,
      isAtBottom: isAtBottom,
      resizeDifference: 0,
      accumulated: 0,
      velocity: 0,
      listeners: new Set(),
      get scrollTop() {
        var _scrollRef$current$sc, _scrollRef$current2;
        return (_scrollRef$current$sc = (_scrollRef$current2 = scrollRef.current) === null || _scrollRef$current2 === void 0 ? void 0 : _scrollRef$current2.scrollTop) !== null && _scrollRef$current$sc !== void 0 ? _scrollRef$current$sc : 0;
      },
      set scrollTop(scrollTop) {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollTop;
          state.ignoreScrollToTop = scrollRef.current.scrollTop;
        }
      },
      get targetScrollTop() {
        if (!scrollRef.current || !contentRef.current) {
          return 0;
        }
        return scrollRef.current.scrollHeight - 1 - scrollRef.current.clientHeight;
      },
      get calculatedTargetScrollTop() {
        var _lastCalculation;
        if (!scrollRef.current || !contentRef.current) {
          return 0;
        }
        var targetScrollTop = this.targetScrollTop;
        if (!options.targetScrollTop) {
          return targetScrollTop;
        }
        if (((_lastCalculation = lastCalculation) === null || _lastCalculation === void 0 ? void 0 : _lastCalculation.targetScrollTop) === targetScrollTop) {
          return lastCalculation.calculatedScrollTop;
        }
        var calculatedScrollTop = Math.max(Math.min(options.targetScrollTop(targetScrollTop, {
          scrollElement: scrollRef.current,
          contentElement: contentRef.current
        }), targetScrollTop), 0);
        lastCalculation = {
          targetScrollTop: targetScrollTop,
          calculatedScrollTop: calculatedScrollTop
        };
        requestAnimationFrame(function () {
          lastCalculation = undefined;
        });
        return calculatedScrollTop;
      },
      get scrollDifference() {
        return this.calculatedTargetScrollTop - this.scrollTop;
      },
      get isNearBottom() {
        return this.scrollDifference <= STICK_TO_BOTTOM_OFFSET_PX;
      }
    };
  }, []);
  var scrollToBottom = useCallback(function () {
    var _state$animation2;
    var scrollOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (typeof scrollOptions === "string") {
      scrollOptions = {
        animation: scrollOptions
      };
    }
    if (!scrollOptions.preserveScrollPosition) {
      setIsAtBottom(true);
    }
    var waitElapsed = Date.now() + (Number(scrollOptions.wait) || 0);
    var behavior = mergeAnimations(optionsRef.current, scrollOptions.animation);
    var _scrollOptions = scrollOptions,
      _scrollOptions$ignore = _scrollOptions.ignoreEscapes,
      ignoreEscapes = _scrollOptions$ignore === void 0 ? false : _scrollOptions$ignore;
    var durationElapsed;
    var startTarget = state.calculatedTargetScrollTop;
    if (scrollOptions.duration instanceof Promise) {
      scrollOptions.duration.finally(function () {
        durationElapsed = Date.now();
      });
    } else {
      var _scrollOptions$durati;
      durationElapsed = waitElapsed + ((_scrollOptions$durati = scrollOptions.duration) !== null && _scrollOptions$durati !== void 0 ? _scrollOptions$durati : 0);
    }
    var next = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var promise;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              promise = new Promise(requestAnimationFrame).then(function () {
                var _state$lastTick;
                if (!state.isAtBottom) {
                  state.animation = undefined;
                  return false;
                }
                var scrollTop = state.scrollTop;
                var tick = performance.now();
                var tickDelta = (tick - ((_state$lastTick = state.lastTick) !== null && _state$lastTick !== void 0 ? _state$lastTick : tick)) / SIXTY_FPS_INTERVAL_MS;
                state.animation || (state.animation = {
                  behavior: behavior,
                  promise: promise,
                  ignoreEscapes: ignoreEscapes
                });
                if (state.animation.behavior === behavior) {
                  state.lastTick = tick;
                }
                if (isSelecting()) {
                  return next();
                }
                if (waitElapsed > Date.now()) {
                  return next();
                }
                if (scrollTop < Math.min(startTarget, state.calculatedTargetScrollTop)) {
                  var _state$animation;
                  if (((_state$animation = state.animation) === null || _state$animation === void 0 ? void 0 : _state$animation.behavior) === behavior) {
                    if (behavior === "instant") {
                      state.scrollTop = state.calculatedTargetScrollTop;
                      return next();
                    }
                    state.velocity = (behavior.damping * state.velocity + behavior.stiffness * state.scrollDifference) / behavior.mass;
                    state.accumulated += state.velocity * tickDelta;
                    state.scrollTop += state.accumulated;
                    if (state.scrollTop !== scrollTop) {
                      state.accumulated = 0;
                    }
                  }
                  return next();
                }
                if (durationElapsed > Date.now()) {
                  startTarget = state.calculatedTargetScrollTop;
                  return next();
                }
                state.animation = undefined;

                /**
                 * If we're still below the target, then queue
                 * up another scroll to the bottom with the last
                 * requested animatino.
                 */
                if (state.scrollTop < state.calculatedTargetScrollTop) {
                  return scrollToBottom({
                    animation: mergeAnimations(optionsRef.current, optionsRef.current.resize),
                    ignoreEscapes: ignoreEscapes,
                    duration: Math.max(0, durationElapsed - Date.now()) || undefined
                  });
                }
                return state.isAtBottom;
              });
              return _context.abrupt("return", promise.then(function (isAtBottom) {
                requestAnimationFrame(function () {
                  if (!state.animation) {
                    state.lastTick = undefined;
                    state.velocity = 0;
                  }
                });
                return isAtBottom;
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function next() {
        return _ref.apply(this, arguments);
      };
    }();
    if (scrollOptions.wait !== true) {
      state.animation = undefined;
    }
    if (((_state$animation2 = state.animation) === null || _state$animation2 === void 0 ? void 0 : _state$animation2.behavior) === behavior) {
      return state.animation.promise;
    }
    return next();
  }, [setIsAtBottom, isSelecting, state]);
  var stopScroll = useCallback(function () {
    setEscapedFromLock(true);
    setIsAtBottom(false);
  }, [setEscapedFromLock, setIsAtBottom]);
  var handleScroll = useCallback(function (_ref2) {
    var target = _ref2.target;
    if (target !== scrollRef.current) {
      return;
    }
    var scrollTop = state.scrollTop,
      ignoreScrollToTop = state.ignoreScrollToTop;
    var _state$lastScrollTop = state.lastScrollTop,
      lastScrollTop = _state$lastScrollTop === void 0 ? scrollTop : _state$lastScrollTop;
    state.lastScrollTop = scrollTop;
    state.ignoreScrollToTop = undefined;
    if (ignoreScrollToTop && ignoreScrollToTop > scrollTop) {
      /**
       * When the user scrolls up while the animation plays, the `scrollTop` may
       * not come in separate events; if this happens, to make sure `isScrollingUp`
       * is correct, set the lastScrollTop to the ignored event.
       */
      lastScrollTop = ignoreScrollToTop;
    }
    setIsNearBottom(state.isNearBottom);

    /**
     * Scroll events may come before a ResizeObserver event,
     * so in order to ignore resize events correctly we use a
     * timeout.
     *
     * @see https://github.com/WICG/resize-observer/issues/25#issuecomment-248757228
     */
    setTimeout(function () {
      var _state$animation3;
      /**
       * When theres a resize difference ignore the resize event.
       */
      if (state.resizeDifference || scrollTop === ignoreScrollToTop) {
        return;
      }
      if (isSelecting()) {
        setEscapedFromLock(true);
        setIsAtBottom(false);
        return;
      }
      var isScrollingDown = scrollTop > lastScrollTop;
      var isScrollingUp = scrollTop < lastScrollTop;
      if ((_state$animation3 = state.animation) !== null && _state$animation3 !== void 0 && _state$animation3.ignoreEscapes) {
        state.scrollTop = lastScrollTop;
        return;
      }
      if (isScrollingUp) {
        setEscapedFromLock(true);
        setIsAtBottom(false);
      }
      if (isScrollingDown) {
        setEscapedFromLock(false);
      }
      if (!state.escapedFromLock && state.isNearBottom) {
        setIsAtBottom(true);
      }
    }, 1);
  }, [setEscapedFromLock, setIsAtBottom, isSelecting, state]);
  var handleWheel = useCallback(function (_ref3) {
    var _state$animation4;
    var target = _ref3.target,
      deltaY = _ref3.deltaY;
    var element = target;
    while (!["scroll", "auto"].includes(getComputedStyle(element).overflow)) {
      if (!element.parentElement) {
        return;
      }
      element = element.parentElement;
    }

    /**
     * The browser may cancel the scrolling from the mouse wheel
     * if we update it from the animation in meantime.
     * To prevent this, always escape when the wheel is scrolled up.
     */
    if (element === scrollRef.current && deltaY < 0 && scrollRef.current.scrollHeight > scrollRef.current.clientHeight && !((_state$animation4 = state.animation) !== null && _state$animation4 !== void 0 && _state$animation4.ignoreEscapes)) {
      setEscapedFromLock(true);
      setIsAtBottom(false);
    }
  }, [setEscapedFromLock, setIsAtBottom, state]);
  var scrollRef = useRefCallback(function (scroll) {
    var _scrollRef$current3, _scrollRef$current4;
    (_scrollRef$current3 = scrollRef.current) === null || _scrollRef$current3 === void 0 || _scrollRef$current3.removeEventListener("scroll", handleScroll);
    (_scrollRef$current4 = scrollRef.current) === null || _scrollRef$current4 === void 0 || _scrollRef$current4.removeEventListener("wheel", handleWheel);
    scroll === null || scroll === void 0 || scroll.addEventListener("scroll", handleScroll, {
      passive: true
    });
    scroll === null || scroll === void 0 || scroll.addEventListener("wheel", handleWheel, {
      passive: true
    });
  }, []);
  var contentRef = useRefCallback(function (content) {
    var _state$resizeObserver, _state$resizeObserver2;
    (_state$resizeObserver = state.resizeObserver) === null || _state$resizeObserver === void 0 || _state$resizeObserver.disconnect();
    if (!content) {
      return;
    }
    var previousHeight;
    state.resizeObserver = new ResizeObserver(function (_ref4) {
      var _previousHeight;
      var _ref5 = _slicedToArray(_ref4, 1),
        entry = _ref5[0];
      var height = entry.contentRect.height;
      var difference = height - ((_previousHeight = previousHeight) !== null && _previousHeight !== void 0 ? _previousHeight : height);
      state.resizeDifference = difference;

      /**
       * Sometimes the browser can overscroll past the target,
       * so check for this and adjust appropriately.
       */
      if (state.scrollTop > state.targetScrollTop) {
        state.scrollTop = state.targetScrollTop;
      }
      setIsNearBottom(state.isNearBottom);
      if (difference >= 0) {
        /**
         * If it's a positive resize, scroll to the bottom when
         * we're already at the bottom (and enabled is not false).
         */
        if (optionsRef.current.enabled !== false) {
          var animation = mergeAnimations(optionsRef.current, previousHeight ? optionsRef.current.resize : optionsRef.current.initial);
          scrollToBottom({
            animation: animation,
            wait: true,
            preserveScrollPosition: true,
            duration: animation === "instant" ? undefined : RETAIN_ANIMATION_DURATION_MS
          });
        }
      } else {
        /**
         * Else if it's a negative resize, check if we're near the bottom
         * if we are want to un-escape from the lock, because the resize
         * could have caused the container to be at the bottom.
         */
        if (state.isNearBottom) {
          setEscapedFromLock(false);
          setIsAtBottom(true);
        }
      }
      previousHeight = height;

      /**
       * Reset the resize difference after the scroll event
       * has fired. Requires a rAF to wait for the scroll event,
       * and a setTimeout to wait for the other timeout we have in
       * resizeObserver in case the scroll event happens after the
       * resize event.
       */
      requestAnimationFrame(function () {
        setTimeout(function () {
          if (state.resizeDifference === difference) {
            state.resizeDifference = 0;
          }
        }, 1);
      });
    });
    (_state$resizeObserver2 = state.resizeObserver) === null || _state$resizeObserver2 === void 0 || _state$resizeObserver2.observe(content);
  }, []);
  return {
    contentRef: contentRef,
    scrollRef: scrollRef,
    scrollToBottom: scrollToBottom,
    stopScroll: stopScroll,
    isAtBottom: isAtBottom || isNearBottom,
    isNearBottom: isNearBottom,
    escapedFromLock: escapedFromLock,
    state: state
  };
};
function useRefCallback(callback, deps) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed
  var result = useCallback(function (ref) {
    result.current = ref;
    return callback(ref);
  }, deps);
  return result;
}
var animationCache = new Map();
function mergeAnimations() {
  var result = _objectSpread({}, DEFAULT_SPRING_ANIMATION);
  var instant = false;
  for (var _len = arguments.length, animations = new Array(_len), _key = 0; _key < _len; _key++) {
    animations[_key] = arguments[_key];
  }
  for (var _i = 0, _animations = animations; _i < _animations.length; _i++) {
    var _animation$damping, _animation$stiffness, _animation$mass;
    var animation = _animations[_i];
    if (animation === "instant") {
      instant = true;
      continue;
    }
    if (_typeof(animation) !== "object") {
      continue;
    }
    instant = false;
    result.damping = (_animation$damping = animation.damping) !== null && _animation$damping !== void 0 ? _animation$damping : result.damping;
    result.stiffness = (_animation$stiffness = animation.stiffness) !== null && _animation$stiffness !== void 0 ? _animation$stiffness : result.stiffness;
    result.mass = (_animation$mass = animation.mass) !== null && _animation$mass !== void 0 ? _animation$mass : result.mass;
  }
  var key = JSON.stringify(result);
  if (!animationCache.has(key)) {
    animationCache.set(key, Object.freeze(result));
  }
  return instant ? "instant" : animationCache.get(key);
}