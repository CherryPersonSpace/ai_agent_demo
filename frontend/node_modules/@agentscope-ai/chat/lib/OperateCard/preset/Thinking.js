import { OperateCard, useProviderContext } from "../..";
import { SparkLoadingLine, SparkMemoryLine } from '@agentscope-ai/icons';
import { jsx as _jsx } from "react/jsx-runtime";
export default function (props) {
  var _useProviderContext = useProviderContext(),
    getPrefixCls = _useProviderContext.getPrefixCls;
  var _props$defaultOpen = props.defaultOpen,
    defaultOpen = _props$defaultOpen === void 0 ? true : _props$defaultOpen,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading;
  var prefixCls = getPrefixCls('operate-card');
  return /*#__PURE__*/_jsx(OperateCard, {
    header: {
      icon: loading ? /*#__PURE__*/_jsx(SparkLoadingLine, {
        spin: true
      }) : /*#__PURE__*/_jsx(SparkMemoryLine, {}),
      title: props.title,
      description: props.subTitle
    },
    body: {
      defaultOpen: loading ? defaultOpen : false,
      children: /*#__PURE__*/_jsx(OperateCard.LineBody, {
        children: /*#__PURE__*/_jsx("div", {
          className: "".concat(prefixCls, "-thinking"),
          children: props.content
        })
      })
    }
  }, loading.toString());
}