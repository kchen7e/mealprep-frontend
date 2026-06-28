// src/env.d.ts
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="react/jsx-runtime" />

declare namespace JSX {
    interface IntrinsicElements {
        [tag: string]: import("react").DetailedHTMLProps<
            import("react").HTMLAttributes<HTMLElement>,
            HTMLElement
        > & {
            [prop: string]: any;
        };
    }
    type Element = import("react").ReactElement;
    type ElementType = import("react").ElementType;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
