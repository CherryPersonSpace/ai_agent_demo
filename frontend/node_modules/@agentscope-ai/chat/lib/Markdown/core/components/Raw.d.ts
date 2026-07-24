import { MarkdownProps } from '../../types';
interface RawProps {
    content: MarkdownProps['content'];
    baseFontSize?: number;
    baseLineHeight?: number;
}
export default function Raw(props: RawProps): import("react/jsx-runtime").JSX.Element;
export {};
