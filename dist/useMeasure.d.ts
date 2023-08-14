/// <reference types="react" />
interface IMeasureState {
    width: null | number;
    height: null | number;
}
export declare function useMeasure(): (IMeasureState | import("react").MutableRefObject<Element | null>)[];
export {};
