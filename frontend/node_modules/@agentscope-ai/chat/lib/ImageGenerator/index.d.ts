import React, { ReactNode } from 'react';
export interface IImageGeneratorProps {
    /**
     * @description 生成图片的宽度，单位为像素
     * @descriptionEn Width of the generated image in pixels
     * @default 320
     */
    width?: number;
    /**
     * @description 生成图片的高度，单位为像素
     * @descriptionEn Height of the generated image in pixels
     * @default 320
     */
    height?: number;
    /**
     * @description 图片的URL地址，为空时显示加载状态
     * @descriptionEn URL address of the image, shows loading state when empty
     * @default ''
     */
    src?: string;
    /**
     * @description 图片生成过程中的提示文本
     * @descriptionEn Prompt text during image generation process
     * @default 'Painting...'
     */
    loadingText?: string;
    /**
     * @description 图片生成完成后的提示文本
     * @descriptionEn Prompt text after image generation is completed
     * @default 'Paint Completed'
     */
    doneText?: string;
    /**
     * @description 自定义骨架屏组件，用于加载状态显示
     * @descriptionEn Custom skeleton screen component for loading state display
     * @default null
     */
    skeleton?: ReactNode;
    /**
     * @description 自定义骨架屏组件的加载态提示
     * @descriptionEn Custom skeleton screen component prompt text
     * @default 'Painting...'
     */
    skeletonText?: string;
    /**
     * @description 是否为块级元素，使得图片宽高比为 width / height
     * @descriptionEn Whether to be a block element, make the image width / height ratio
     * @default false
     */
    block?: boolean;
}
declare const ImageGenerator: React.FC<IImageGeneratorProps>;
export default ImageGenerator;
