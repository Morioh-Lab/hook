interface IClipboard {
    timeout?: number;
}
export declare function useCopyToClipboard({ timeout }: IClipboard): [boolean, (text: string) => void];
export {};
