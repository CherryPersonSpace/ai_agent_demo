import { jsx as _jsx } from "react/jsx-runtime";
export default function DisabledImage(props) {
  return /*#__PURE__*/_jsx("a", {
    href: props.src,
    target: "_blank",
    rel: "noopener noreferrer",
    children: props.src
  });
}