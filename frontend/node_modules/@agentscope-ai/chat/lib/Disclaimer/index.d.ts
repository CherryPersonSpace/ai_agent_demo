import React from 'react';
export interface IDisclaimerProps {
    /**
     * @description 免责声明的文本内容，用于提醒用户AI的局限性
     * @descriptionEn Disclaimer text content for reminding users of AI limitations
     */
    desc?: React.ReactElement | string;
    /**
     * @description 免责声明组件的内联样式对象，用于自定义外观
     * @descriptionEn Inline style object for the disclaimer component for customizing appearance
     */
    style?: React.CSSProperties;
    /**
     * @description 免责声明后的链接配置，用于提供更多相关信息
     * @descriptionEn Link configuration after disclaimer for providing additional relevant information
     */
    afterLink?: {
        href: string;
        text: string;
    };
}
export default function (props: IDisclaimerProps): import("react/jsx-runtime").JSX.Element;
