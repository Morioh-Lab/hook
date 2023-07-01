/// <reference types="react" />
export declare function useOnClickOutside<T extends HTMLElement = HTMLElement>(handler: (event: MouseEvent) => void, mouseEvent?: 'mousedown' | 'mouseup'): import("react").MutableRefObject<T | undefined>;
