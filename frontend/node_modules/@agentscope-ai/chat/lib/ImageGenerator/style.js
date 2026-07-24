var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { createGlobalStyle } from 'antd-style';
export default createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.", "-image-generator {\n\n  .", "-image {\n    border-radius: 8px;\n    filter: blur(20px);\n    animation: ", "clearBlur 1s ease forwards;\n    overflow: hidden;\n  }\n\n\n  &-wrapper {\n    overflow: hidden;\n  }\n\n\n  &-text {\n    position: relative;\n    display: flex;\n    gap: 8px;\n    height: 40px;\n    align-items: center;\n    font-size: 14px;\n    line-height: 26px;\n    color: ", ";\n\n\n    &-success {\n      color: ", ";\n      font-size: 20px;\n    }\n  }\n\n  &-default-skeleton {\n    position: relative;\n    overflow: hidden;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n\n    &-bg {\n      position: absolute;\n      inset: 0;\n    }\n\n    &-icon {\n      width: 32px;\n      height: 32px;\n    } \n\n    &-content {\n      display: flex;\n      flex-direction: column;\n      gap: 4px;\n      align-items: center;\n      justify-content: center;\n      z-index: 1;\n      \n    }\n\n    &-text {\n      margin-top: 8px;\n      font-size: 14px;\n      color: ", ";\n    }\n  }\n}\n\n\n\n@keyframes ", "clearBlur {\n  from {\n    filter: blur(20px);\n  }\n  to {\n    filter: blur(0);\n  }\n}\n\n"])), function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.prefixCls;
}, function (p) {
  return p.theme.colorText;
}, function (p) {
  return p.theme.colorSuccess;
}, function (p) {
  return p.theme.colorBgBase;
}, function (p) {
  return p.theme.prefixCls;
});