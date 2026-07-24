var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { createGlobalStyle } from 'antd-style';
export default createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.", "-markdown {\n  color: inherit;\n  max-width: 100%;\n\n  blockquote {\n    padding-inline: 0.6em 0;\n    padding-block: 0;\n    margin: 1em 0;\n    border-inline-start: 4px solid ", ";\n    opacity: 0.85;\n  }\n\n  figure {\n    margin: 0;\n  }\n\n  code {\n    font-size: 0.8571428571428571em;\n    border: 0;\n    margin: 0;\n    background-color: ", ";\n    color: ", ";\n    border-radius: ", "px;\n    padding: 2px 6px;\n    margin-inline: 3px;\n    border: 1px solid ", ";\n  }\n\n  pre code {\n    font-size: 0.8571428571428571em;\n    background-color: transparent;\n    border: none;\n  }\n\n  .", "-mermaid,\n  .", "-codeHighlighter {\n    border: 1px solid ", ";\n    border-radius: ", "px;\n    \n  }\n\n  .", "-mermaid-graph,\n  .", "-codeHighlighter-code {\n    border: none;\n    background-color: ", ";\n\n    * {\n      background-color: transparent !important;\n    }\n  }\n\n\n  .", "-code-header {\n    display: flex;\n    justify-content: space-between;\n    background: ", ";\n    border-bottom: 1px solid ", ";\n    height: 28px;\n    line-height: 28px;\n    align-items: center;\n    user-select: none;\n    position: relative;\n    padding: 0 12px;\n\n    &-lang {\n      font-weight: bold;\n    }\n\n    &-actions {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    &-download {\n      font-size: 16px;\n      cursor: pointer;\n    }\n\n    &-icon {\n      font-size: 16px;\n      cursor: pointer;\n    }\n\n    &-copied {\n      color: ", ";\n      cursor: pointer;\n      font-size: 16px;\n    }\n  }\n\n\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin-top: 0.5714285714285714em;\n    margin-bottom: 0.5714285714285714em;\n    font-weight: 500;\n    line-height: 1.7777;\n    color: inherit;\n  }\n\n  p {\n    margin-bottom: 0.5714285714285714em;\n  }\n\n  h1 {\n    font-size: 1.2857142857142858em;\n  }\n\n  h2 {\n    font-size: 1.1428571428571428em;\n  }\n\n  h3 {\n    font-size: 1em;\n  }\n\n  h4 {\n    font-size: 1em;\n  }\n\n  h5 {\n    font-size: 1em;\n  }\n\n  h6 {\n    font-size: 1em;\n  }\n\n  hr {\n    border-color: ", ";\n    border-style: solid;\n    border-width: 1px 0 0 0;\n    margin: 1em 0;\n  }\n\n  table {\n    border-collapse: collapse;\n    display: block;\n    width: max-content;\n    max-width: 100%;\n    overflow: auto;\n  }\n\n  table th {\n    background: ", ";\n    text-align: left;\n  }\n\n  table td,\n  table th {\n    padding: 0.75em 1.5em;\n    border: 1px solid ", ";\n    white-space: pre;\n  }\n\n  .", "-image {\n    max-width: 480px;\n    overflow: hidden;\n  }\n\n  .", "-markdown-video {\n    position: relative;\n    \n    &-poster {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      max-width: 480px;\n      background-color: #000;\n      border-radius: 8px;\n      padding: 100px 0;\n      cursor: pointer;\n    }\n\n    &-play {\n      color: #ccc;\n      font-size: 30px;\n    }\n  }\n}\n\n.", "-markdown.x-markdown {\n  img {\n    margin: 0;\n  }\n}\n\n\n.", "-markdown  > *:last-child {\n  margin-bottom: 0 !important;\n}\n\n.", "-markdown  > *:first-child {\n  margin-top: 0 !important;\n}\n\n.", "-markdown-footnotes {\n  > h2 {\n    display: none;\n  }\n\n  > ol {\n    margin: 0 0 0 1em;\n  }\n\n  [data-footnote-backref] {\n    display: none;\n  }\n\n}\n\n\n.", "-markdown-footnote {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 16px;\n  padding: 0 4px;\n  height: 16px;\n  margin-inline: 2px;\n  font-size: 10px;\n  color: ", ";\n  text-align: center;\n  background: ", ";\n  border-radius: 4px;\n  transition: all 100ms ", ";\n  cursor: pointer;\n  line-height: 1;\n\n  &:hover {\n    color: ", ";\n    background: ", ";\n  }\n}\n"])), function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorBorder;
}, function (p) {
  return p.theme.colorFillQuaternary;
}, function (p) {
  return p.theme.colorText;
}, function (p) {
  return p.theme.borderRadiusSM;
}, function (p) {
  return p.theme.colorBorderSecondary;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorBorderSecondary;
}, function (p) {
  return p.theme.borderRadiusSM;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorBgBase;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorFillSecondary;
}, function (p) {
  return p.theme.colorBorderSecondary;
}, function (p) {
  return p.theme.colorSuccess;
}, function (p) {
  return p.theme.colorBorderSecondary;
}, function (p) {
  return p.theme.colorFillQuaternary;
}, function (p) {
  return p.theme.colorBorderSecondary;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorTextSecondary;
}, function (p) {
  return p.theme.colorFillSecondary;
}, function (p) {
  return p.theme.motionEaseOut;
}, function (p) {
  return p.theme.colorWhite;
}, function (p) {
  return p.theme.colorPrimary;
});