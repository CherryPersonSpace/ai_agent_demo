/// <reference types="react" />
interface IBeforeUIContainerProps {
    leftChildren?: React.ReactNode;
    rightChildren?: React.ReactNode;
    children?: React.ReactNode;
}
export default function BeforeUIContainer({ leftChildren, rightChildren, children }: IBeforeUIContainerProps): import("react/jsx-runtime").JSX.Element;
export {};
