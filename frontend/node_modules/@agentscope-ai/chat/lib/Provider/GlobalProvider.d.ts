import React from "react";
import { ProviderProps } from './types';
export declare const GlobalContext: React.Context<Pick<ProviderProps, "markdown">>;
export declare const GlobalProvider: (props: Pick<ProviderProps, 'markdown' | 'children'>) => import("react/jsx-runtime").JSX.Element;
export declare const useGlobalContext: () => Pick<ProviderProps, "markdown">;
