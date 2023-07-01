interface IScriptProps {
    src: string;
    [key: string]: any;
}
export declare function useScript({ src, ...attrs }: IScriptProps): {
    loading: boolean;
    error: Event | undefined;
};
export {};
