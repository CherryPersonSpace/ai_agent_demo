/// <reference types="react" />
export interface DefaultRenderProps {
    text: string;
    url: string;
    title: string;
    content: string;
}
export interface CitationComponentProps extends DefaultRenderProps {
    render: (props: DefaultRenderProps) => React.ReactNode;
}
export default function CitationComponent(props: DefaultRenderProps & {
    citationsData: Record<string, any>;
}): import("react/jsx-runtime").JSX.Element;
