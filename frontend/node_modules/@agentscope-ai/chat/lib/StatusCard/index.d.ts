/// <reference types="react" />
export interface IStatusCardProps {
    /**
     * @description 标题
     * @descriptionEn Title
     */
    title: string | React.ReactNode;
    /**
     * @description 状态
     * @descriptionEn Status
     */
    status: 'success' | 'error' | 'warning' | 'info';
    /**
     * @description 描述
     * @descriptionEn Description
     */
    description?: string;
    /**
     * @description 图标
     * @descriptionEn Icon
     */
    icon?: React.ReactNode;
    /**
     * @description 子元素
     * @descriptionEn Children
     */
    children?: React.ReactNode;
}
declare function StatusCard(props: IStatusCardProps): import("react/jsx-runtime").JSX.Element;
declare namespace StatusCard {
    var HITL: (props: IStatusCardHITLProps) => import("react/jsx-runtime").JSX.Element;
    var Statistic: (props: IStatusCardStatisticProps) => import("react/jsx-runtime").JSX.Element;
}
export interface IStatusCardHITLProps {
    /**
     * @description 标题
     * @descriptionEn Title
     */
    title: string | React.ReactNode;
    /**
     * @description 描述
     * @descriptionEn Description
     * @default '需要用户人工干预'
     */
    description?: string;
    /**
     * @description 等待按钮文本
     * @descriptionEn Wait Button Text
     * @default '我已完成，继续任务'
     */
    waitButtonText?: string;
    /**
     * @description 完成按钮文本
     * @descriptionEn Done Button Text
     * @default '用户已确认'
     */
    doneButtonText?: string;
    /**
     * @description 是否完成
     * @descriptionEn Done
     */
    done: boolean;
    /**
     * @description 完成回调
     * @descriptionEn Done Callback
     */
    onDone: () => void;
    /**
     * @description 操作按钮
     * @descriptionEn Actions
     */
    actions?: React.ReactNode;
}
export interface IStatusCardStatisticProps {
    /**
     * @description 统计数据
     * @descriptionEn Values
     */
    values: {
        title: string;
        value: string;
    }[];
}
export default StatusCard;
