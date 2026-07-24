import * as React from 'react';
export interface SendHeaderContextProps {
    /**
     * @description 自定义CSS类名前缀，用于样式隔离和主题定制
     * @descriptionEn Custom CSS class name prefix for style isolation and theme customization
     */
    prefixCls: string;
    /**
     * @description 用户是否focus
     * @descriptionEn Whether the user is focused
     */
    focus?: boolean;
    /**
     * @description 是否启用用户focus时展开输入框组件
     * @descriptionEn Whether to enable the user focus to expand the input box component
     */
    enableFocusExpand?: boolean;
}
export declare const SendHeaderContext: React.Context<SendHeaderContextProps>;
export type SemanticType = 'header' | 'content';
export interface SenderHeaderProps {
    /**
     * @description 是否强制渲染组件，即使不可见也保持DOM结构
     * @descriptionEn Whether to force render the component, maintaining DOM structure even when invisible
     */
    forceRender?: boolean;
    /**
     * @description 是否展开头部区域，控制显示状态
     * @descriptionEn Whether to expand the header area, controls display state
     */
    open?: boolean;
    /**
     * @description 展开状态变化时的回调函数
     * @descriptionEn Callback function when expand state changes
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * @description 头部标题内容，支持文本或React元素
     * @descriptionEn Header title content, supports text or React elements
     */
    title?: React.ReactNode;
    /**
     * @description 头部内容区域，用于显示额外的信息或控件
     * @descriptionEn Header content area for displaying additional information or controls
     */
    children?: React.ReactNode;
    /**
     * @description 组件的CSS类名
     * @descriptionEn CSS class name for the component
     */
    className?: string;
    /**
     * @description 组件的内联样式对象
     * @descriptionEn Inline style object for the component
     */
    style?: React.CSSProperties;
    /**
     * @description 语义化CSS类名，用于为不同区域添加自定义类名
     * @descriptionEn Semantic CSS class names for adding custom classes to different areas
     */
    classNames?: Partial<Record<SemanticType, string>>;
    /**
     * @description 语义化样式对象，用于精确控制不同区域的样式
     * @descriptionEn Semantic style object for precise control of different area styles
     */
    styles?: Partial<Record<SemanticType, React.CSSProperties>>;
    /**
     * @description 是否显示关闭按钮，用于控制头部区域的展开/收起
     * @descriptionEn Whether to show close button for controlling header area expand/collapse
     */
    closable?: boolean;
}
export default function SenderHeader(props: SenderHeaderProps): import("react/jsx-runtime").JSX.Element;
