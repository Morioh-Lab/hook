export declare function useDebounce<T>(value: T, delay?: number): T;
export declare function useDebounceCallback<A extends any[]>(callback: (...args: A) => void, wait: number): (...args: A) => void;
