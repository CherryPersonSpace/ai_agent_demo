var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { createGlobalStyle } from 'antd-style';
export default createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.", "-sender-before-ui-container {\n  position: relative;\n  height: 40px;\n\n  &-content {\n    position: absolute;\n    top: 8px;\n    left: 0;\n    right: 0;\n    height: 40px;\n    border: 1px solid ", ";\n    border-radius: ", "px ", "px 0 0;\n    background: ", ";\n    transition: all 0.3s;\n\n    &-children {\n      display: flex;\n      justify-content: space-between; \n      align-items: center;\n      height: 32px;\n      padding: 0 12px;\n    }\n  }\n}\n"])), function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorBorderSecondary;
}, function (p) {
  return p.theme.borderRadiusLG;
}, function (p) {
  return p.theme.borderRadiusLG;
}, function (p) {
  return p.theme.colorFillTertiary;
});