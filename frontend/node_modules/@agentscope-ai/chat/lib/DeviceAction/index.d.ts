export interface IDeviceActionProps {
    /**
     * @description 时间
     * @descriptionEn Time
     * @default ''
     */
    time?: string;
    /**
     * @description 动作
     * @descriptionEn Action
     * @default ''
     */
    action: 'Click' | 'Swipe' | 'Type' | 'Back' | 'Home' | 'Done' | 'Wait' | 'click' | 'right click' | 'open app' | 'computer_double_click' | 'hotkey' | 'presskey' | 'scroll' | 'drag' | 'type_with_clear_enter_pos' | 'triple_click' | 'drag_end' | 'type' | 'hscroll' | 'done' | 'wait' | 'call_user';
    /**
     * @description 动作名称，通常不用传入，会根据 action 自动生成
     * @descriptionEn Action Name, usually not passed in, will be generated automatically based on action
     * @default ''
     */
    actionName?: string;
    /**
     * @description 描述
     * @descriptionEn Description
     * @default ''
     */
    description: string;
    /**
     * @description 操作截图
     * @descriptionEn Operation Screenshot
     * @default ''
     */
    image?: string;
}
export default function (props: IDeviceActionProps): import("react/jsx-runtime").JSX.Element;
