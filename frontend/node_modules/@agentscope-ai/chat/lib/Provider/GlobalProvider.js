import React, { createContext } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
export var GlobalContext = /*#__PURE__*/createContext(undefined);
export var GlobalProvider = function GlobalProvider(props) {
  return /*#__PURE__*/_jsx(GlobalContext.Provider, {
    value: props,
    children: props.children
  });
};
export var useGlobalContext = function useGlobalContext() {
  var context = React.useContext(GlobalContext);
  return context || {};
};