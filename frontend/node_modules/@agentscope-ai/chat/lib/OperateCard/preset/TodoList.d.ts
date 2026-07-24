export interface ITodoListProps {
    /**
     * @description 标题
     * @descriptionEn Title
     * @default 'Task List'
     */
    title?: string;
    /**
     * @description 默认展开
     * @descriptionEn Default Open
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * @description Todo 列表
     * @descriptionEn Todo List
     * @default []
     */
    list: {
        title: string;
        status: 'done' | 'todo' | 'running';
    }[];
}
export default function (props: ITodoListProps): import("react/jsx-runtime").JSX.Element;
