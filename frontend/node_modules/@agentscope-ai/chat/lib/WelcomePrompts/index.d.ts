import React from 'react';
export interface IWelcomePromptsProps {
    /**
     * @description 欢迎语
     * @descriptionEn Greeting text
     */
    greeting?: string | React.ReactElement;
    /**
     * @description 描述信息
     * @descriptionEn Description text
     */
    description?: string | React.ReactElement;
    /**
     * @description 头像
     * @descriptionEn Avatar
     */
    avatar?: string | React.ReactElement;
    /**
     * @description 提示语列表
     * @descriptionEn Prompt list
     */
    prompts?: ({
        label?: string;
        value: string;
        icon?: React.ReactElement;
    } | string)[];
    /**
     * @description 点击提示语时的回调
     * @descriptionEn Callback when a prompt is clicked
     */
    onClick?: (query: string) => void;
}
export default function WelcomePrompts(props: IWelcomePromptsProps): import("react/jsx-runtime").JSX.Element;
