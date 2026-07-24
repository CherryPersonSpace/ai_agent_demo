import { ConfigProvider } from "@agentscope-ai/design";
import React from "react";
import { CustomCardsProvider, CustomCardsContext, useCustomCardsContext } from "./CustomCardsProvider";
import { GlobalProvider, GlobalContext, useGlobalContext } from "./GlobalProvider";
import { jsx as _jsx } from "react/jsx-runtime";
var SparkChatProvider = function SparkChatProvider(props) {
  var children = props.children,
    cardConfig = props.cardConfig,
    markdown = props.markdown;
  return /*#__PURE__*/_jsx(GlobalProvider, {
    markdown: markdown,
    children: /*#__PURE__*/_jsx(CustomCardsProvider, {
      cardConfig: cardConfig,
      children: children
    })
  });
};
export function useProviderContext() {
  var context = React.useContext(ConfigProvider.ConfigContext);
  return context;
}
export default SparkChatProvider;
export { useCustomCardsContext, CustomCardsProvider, useGlobalContext, CustomCardsContext, GlobalProvider, GlobalContext };