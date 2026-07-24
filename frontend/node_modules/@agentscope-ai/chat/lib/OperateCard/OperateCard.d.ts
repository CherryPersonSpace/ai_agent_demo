/// <reference types="react" />
export interface IOperateCardProps {
    /**
     * @description 头部配置
     * @descriptionEn Header Config
     * @default {}
     */
    header: {
        className?: string;
        style?: React.CSSProperties;
        icon: React.ReactNode;
        title: React.ReactNode | string;
        description?: React.ReactNode | string;
    };
    /**
     * @description 内容配置
     * @descriptionEn Body Config
     * @default {}
     */
    body?: {
        children?: React.ReactNode;
        defaultOpen?: boolean;
    };
}
declare function OperateCard(props: IOperateCardProps): import("react/jsx-runtime").JSX.Element;
declare namespace OperateCard {
    var LineBody: (props: {
        children?: import("react").ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
}
export default OperateCard;
