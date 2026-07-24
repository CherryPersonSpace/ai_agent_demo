export declare const CursorComponent: (props: any) => import("react/jsx-runtime").JSX.Element;
export declare function cursorExtension(): {
    name: string;
    level: string;
    start(src: any): any;
    tokenizer(src: any, tokens: any): {
        type: string;
        raw: string;
        name: string;
        cursor: any;
    };
    renderer(token: any): string;
};
