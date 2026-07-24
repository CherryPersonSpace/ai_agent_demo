export { default as CitationComponent } from './CitationComponent';
export declare function citationsExtension(citationsData: any): {
    name: string;
    level: "inline";
    tokenizer(src: string): {
        type: string;
        raw: string;
        text: string;
        renderType: string;
    };
    renderer(token: any): any;
};
