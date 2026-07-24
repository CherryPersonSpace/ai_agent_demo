/**
 * 流体背景动画组件
 * @param {string} width - 容器宽度，默认 '400px'
 * @param {string} height - 容器高度，默认 '400px'
 * @param {number} speed - 动画速度倍数，默认 1.0
 * @param {string} backgroundColor - 主背景颜色，默认 '#b6a9f8'
 * @param {string[]} colors - 圆形元素颜色数组（4个颜色），默认 ['#c979ee', '#ef788c', '#eb7fc6', '#6d67c8']
 * @param {string[]} ringColors - 环形渐变颜色数组，默认 ['white', 'blue', 'magenta', 'violet', 'lightyellow']
 * @param {string} className - 自定义 CSS 类名
 */
declare const Spin: ({ speed, backgroundColor, colors, ringColors, className }: {
    speed?: number;
    backgroundColor?: string;
    colors?: string[];
    ringColors?: string[];
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
export default Spin;
