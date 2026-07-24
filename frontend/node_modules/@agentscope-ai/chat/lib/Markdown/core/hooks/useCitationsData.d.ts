import { CitationComponentProps } from '../plugins/citations/CitationComponent';
export default function useCitationsData(props: any): {
    CitationComponent: (props: CitationComponentProps) => import("react/jsx-runtime").JSX.Element;
    citationsData: any;
    citationsDataCount: number;
};
