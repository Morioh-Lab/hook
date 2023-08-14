import { RefObject } from 'react';
export declare const useClickOutside: <E extends Event = Event>(ref: RefObject<HTMLElement | null>, handler: (event: E) => void, events?: Array<keyof DocumentEventMap>) => void;
