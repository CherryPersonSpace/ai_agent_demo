import { useProviderContext } from "../../..";
import { jsx as _jsx } from "react/jsx-runtime";
export default function Raw(props) {
  var prefixCls = useProviderContext().getPrefixCls('markdown');
  return /*#__PURE__*/_jsx("div", {
    className: prefixCls,
    style: {
      fontSize: props.baseFontSize,
      lineHeight: props.baseLineHeight
    },
    children: props.content
  });
}