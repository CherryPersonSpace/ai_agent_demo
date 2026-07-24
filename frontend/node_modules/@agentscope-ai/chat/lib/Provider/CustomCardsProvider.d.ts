import React from "react";
import { ProviderProps } from './types';
import { DefaultCards } from "..";
export declare const CustomCardsContext: React.Context<Record<string, any>>;
export declare const CustomCardsProvider: (props: Pick<ProviderProps, 'cardConfig' | 'children'>) => import("react/jsx-runtime").JSX.Element;
export declare const useCustomCardsContext: () => {
    DeepThink: typeof DefaultCards.DeepThink;
    DeepThinking: typeof DefaultCards.DeepThink;
    Files: typeof DefaultCards.Files;
    Images: typeof DefaultCards.Images;
    Text: typeof DefaultCards.Text;
    Footer: typeof DefaultCards.Footer;
    FooterActions: typeof DefaultCards.FooterActions;
    FooterCount: typeof DefaultCards.FooterCount;
    Interrupted: typeof DefaultCards.Interrupted;
    Videos: typeof DefaultCards.Videos;
    Audios: typeof DefaultCards.Audios;
};
