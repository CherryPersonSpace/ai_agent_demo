import React from "react";
interface IItem {
    icon: string | React.ReactNode;
    label: string | React.ReactNode;
    selectedLabel?: string | React.ReactNode;
    tooltip?: string | React.ReactNode;
    value: string;
}
interface IProps {
    options: IItem[];
    value: string;
    desc?: React.ReactNode | string;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
    closeTip?: React.ReactNode | string;
}
export default function (props: IProps): import("react/jsx-runtime").JSX.Element;
export {};
