import Underline from "./Underline";
import Dot from "./Dot";
import { jsx as _jsx } from "react/jsx-runtime";
export var CursorComponent = function CursorComponent(props) {
  var type = props['data-type'];
  if (type === 'dot') {
    return /*#__PURE__*/_jsx(Dot, {});
  }
  if (type === 'underline') {
    return /*#__PURE__*/_jsx(Underline, {});
  }
  return null;
};
export function cursorExtension() {
  var options = {
    cursors: {
      dot: 'dot',
      underline: 'underline'
    }
  };
  var cursorNames = Object.keys(options.cursors).map(function (e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('|');
  var cursorRegex = new RegExp(":(".concat(cursorNames, "):"));
  var tokenizerRule = new RegExp("^".concat(cursorRegex.source));
  return {
    name: 'cursor',
    level: 'inline',
    start: function start(src) {
      var _src$match;
      return (_src$match = src.match(cursorRegex)) === null || _src$match === void 0 ? void 0 : _src$match.index;
    },
    tokenizer: function tokenizer(src, tokens) {
      var match = tokenizerRule.exec(src);
      if (!match) {
        return;
      }
      var name = match[1];
      var cursor = options.cursors[name];
      if (!cursor) {
        return;
      }
      return {
        type: 'cursor',
        raw: match[0],
        name: name,
        cursor: cursor
      };
    },
    renderer: function renderer(token) {
      var content = "<custom-cursor data-type=\"".concat(token.name, "\"></custom-cursor>");
      return content;
    }
  };
}