/// <reference types="react" />
export declare function useMouse<T extends HTMLElement>(): ({
    x: number;
    y: number;
    elementX: number;
    elementY: number;
    elementPositionX: number;
    elementPositionY: number;
} | import("react").RefObject<T>)[];
