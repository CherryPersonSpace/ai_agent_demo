interface IProps {
    data: {
        title?: string;
        type?: 'error' | 'interrupted';
        desc?: string;
    };
}
export default function (props: IProps): import("react/jsx-runtime").JSX.Element;
export {};
