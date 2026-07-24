import { ReactNode } from 'react';
export interface IRagProps {
    /**
     * @description 标题
     * @descriptionEn Title
     * @default '知识库检索'
     */
    title?: string;
    /**
     * @description 副标题
     * @descriptionEn Subtitle
     * @default ''
     */
    subTitle?: string;
    /**
     * @description 召回知识列表
     * @descriptionEn RAG List
     * @default []
     */
    list: {
        score?: number | string | ReactNode;
        title: string;
        content: string;
        footer: string;
        images?: string[];
        link?: string;
    }[];
    /**
     * @description 默认展开
     * @descriptionEn Default Open
     * @default true
     */
    defaultOpen?: boolean;
    /**
     * @description 空状态占位内容
     * @descriptionEn Empty Placeholder
     * @default '暂无数据'
     */
    placeholder?: string;
    query: string;
    /**
     * @description 检索图片列表
     * @descriptionEn Query Images
     * @default []
     */
    images?: string[];
    filters?: string;
}
export default function (props: IRagProps): import("react/jsx-runtime").JSX.Element;
