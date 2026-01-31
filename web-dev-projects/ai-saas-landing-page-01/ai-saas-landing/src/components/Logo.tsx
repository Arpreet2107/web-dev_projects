import logoImage from '@/src/assets/images/sphereal-logo.svg'
import { twMerge } from 'tailwind-merge';
import { HTMLAttributes } from 'react';


export const Logo = (props: HTMLAttributes<HTMLDivElement>) => {
    const {className, style, ...otherProps} = props;
    return(
        <div
              className={twMerge("size-10 bg-gray-200 bg-[conic-gradient(from_45deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400))]", className)}
              style={{
                maskImage: `url(${logoImage.src})`,
                maskSize: "contain",
                ...style,
              }}
              {...otherProps}
            ></div>
    )
}