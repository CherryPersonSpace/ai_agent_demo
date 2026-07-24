import { CustomCardsProvider, CustomCardsContext, useCustomCardsContext } from './CustomCardsProvider';
import { GlobalProvider, GlobalContext, useGlobalContext } from './GlobalProvider';
import type { ProviderProps } from './types';
declare const SparkChatProvider: (props: ProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare function useProviderContext(): import("antd/es/config-provider").ConfigConsumerProps;
export default SparkChatProvider;
export { useCustomCardsContext, CustomCardsProvider, useGlobalContext, CustomCardsContext, GlobalProvider, GlobalContext, ProviderProps };
