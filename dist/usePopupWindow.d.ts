interface PopupProps {
    onClose?: () => void;
    title?: string;
    w?: number;
    h?: number;
}
export declare function usePopupWindow({ onClose, title, w, h }: PopupProps): {
    open: (url: string) => void;
};
export {};
