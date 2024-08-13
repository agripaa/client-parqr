import { StaticImageData } from 'next/image';

export interface ILogoPng {
    size?: number;
    width?: number;
    height?: number;
    src: string | StaticImageData;
    className?: string;
}

export interface IImage extends ILogoPng {
    alt?: string | undefined;
}