import * as React from 'react';
import { IImage } from '@/interface';
import Image from 'next/image';

export const Img: React.FunctionComponent<IImage> = ({
    src,
    className,
    alt,
    width,
    height,
    size,
}) => {
    return (
        <Image 
            src={src}
            alt={alt as string}
            className={className}
            width={width || size}
            height={height || size}
        />
    )
}