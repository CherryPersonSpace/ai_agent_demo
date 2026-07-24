export interface IMermaidProps {
    /**
     * @description Mermaid 图表的源代码，包含图表定义和配置
     * @descriptionEn Mermaid chart source code containing chart definition and configuration
     */
    content: string;
    /**
     * @description 图表的宽度，支持数字（像素）或字符串（CSS单位）
     * @descriptionEn Width of the chart, supports number (pixels) or string (CSS units)
     */
    width?: number | string;
    /**
     * @description 图表的高度，支持数字（像素）或字符串（CSS单位）
     * @descriptionEn Height of the chart, supports number (pixels) or string (CSS units)
     */
    height?: number | string;
}
export default function Mermaid(props: IMermaidProps): import("react/jsx-runtime").JSX.Element;
