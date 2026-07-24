interface IProps {
    cursor: boolean | 'dot' | 'underline';
    content: string;
    animation: boolean;
}
export default function useCursorContent(props: IProps): string;
export {};
