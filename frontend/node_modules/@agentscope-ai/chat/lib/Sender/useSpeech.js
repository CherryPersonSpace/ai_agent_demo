function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useEvent, useMergedState } from 'rc-util';
import React from 'react';

// Ensure that the SpeechRecognition API is available in the browser
var SpeechRecognition;
if (!SpeechRecognition && typeof window !== 'undefined') {
  SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
}
export default function useSpeech(onSpeech, allowSpeech) {
  var onEventSpeech = useEvent(onSpeech);

  // ========================== Speech Config ==========================
  var _React$useMemo = React.useMemo(function () {
      if (_typeof(allowSpeech) === 'object') {
        return [allowSpeech.recording, allowSpeech.onRecordingChange, typeof allowSpeech.recording === 'boolean'];
      }
      return [undefined, undefined, false];
    }, [allowSpeech]),
    _React$useMemo2 = _slicedToArray(_React$useMemo, 3),
    controlledRecording = _React$useMemo2[0],
    onControlledRecordingChange = _React$useMemo2[1],
    speechInControlled = _React$useMemo2[2];

  // ======================== Speech Permission ========================
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    permissionState = _React$useState2[0],
    setPermissionState = _React$useState2[1];
  React.useEffect(function () {
    if (typeof navigator !== 'undefined' && 'permissions' in navigator) {
      var lastPermission = null;
      navigator.permissions.query({
        name: 'microphone'
      }).then(function (permissionStatus) {
        setPermissionState(permissionStatus.state);

        // Keep the last permission status.
        permissionStatus.onchange = function () {
          setPermissionState(this.state);
        };
        lastPermission = permissionStatus;
      });
      return function () {
        // Avoid memory leaks
        if (lastPermission) {
          lastPermission.onchange = null;
        }
      };
    }
  }, []);

  // Convert permission state to a simple type
  var mergedAllowSpeech = SpeechRecognition && permissionState !== 'denied';

  // ========================== Speech Events ==========================
  var recognitionRef = React.useRef(null);
  var _useMergedState = useMergedState(false, {
      value: controlledRecording
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    recording = _useMergedState2[0],
    setRecording = _useMergedState2[1];
  var forceBreakRef = React.useRef(false);
  var ensureRecognition = function ensureRecognition() {
    if (mergedAllowSpeech && !recognitionRef.current) {
      var recognition = new SpeechRecognition();
      recognition.onstart = function () {
        setRecording(true);
      };
      recognition.onend = function () {
        setRecording(false);
      };
      recognition.onresult = function (event) {
        if (!forceBreakRef.current) {
          var _results;
          var _transcript = (_results = event.results) === null || _results === void 0 || (_results = _results[0]) === null || _results === void 0 || (_results = _results[0]) === null || _results === void 0 ? void 0 : _results.transcript;
          onEventSpeech(_transcript);
        }
        forceBreakRef.current = false;
      };
      recognitionRef.current = recognition;
    }
  };
  var triggerSpeech = useEvent(function (forceBreak) {
    // Ignore if `forceBreak` but is not recording
    if (forceBreak && !recording) {
      return;
    }
    forceBreakRef.current = forceBreak;
    if (speechInControlled) {
      // If in controlled mode, do nothing
      onControlledRecordingChange === null || onControlledRecordingChange === void 0 || onControlledRecordingChange(!recording);
    } else {
      ensureRecognition();
      if (recognitionRef.current) {
        if (recording) {
          recognitionRef.current.stop();
          onControlledRecordingChange === null || onControlledRecordingChange === void 0 || onControlledRecordingChange(false);
        } else {
          recognitionRef.current.start();
          onControlledRecordingChange === null || onControlledRecordingChange === void 0 || onControlledRecordingChange(true);
        }
      }
    }
  });
  return [mergedAllowSpeech, triggerSpeech, recording];
}