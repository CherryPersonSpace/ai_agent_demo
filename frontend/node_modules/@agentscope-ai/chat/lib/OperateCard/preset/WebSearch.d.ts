export interface IWebSearchProps {
    /**
     * @description 标题
     * @descriptionEn Title
     * @default '联网搜索'
     */
    title?: string;
    /**
     * @description 副标题
     * @descriptionEn Subtitle
     * @default ''
     */
    subTitle?: string;
    /**
     * @description 列表
     * @descriptionEn List
     * @default []
     */
    list: {
        title: string;
        subTitle?: string;
        link: string;
        icon: string;
    }[];
}
export default function (props: IWebSearchProps): import("react/jsx-runtime").JSX.Element;
