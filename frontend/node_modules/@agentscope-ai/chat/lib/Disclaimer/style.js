var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { createGlobalStyle } from 'antd-style';
export default createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.", "-disclaimer {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 1.5;\n  color: ", ";\n  padding: 8px 12px;\n}\n\n.", "-disclaimer-after-link {\n  padding-left: 8px;\n}\n"])), function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorTextTertiary;
}, function (p) {
  return p.theme.prefixCls;
});