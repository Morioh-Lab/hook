import { RefObject } from 'react';
/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 1: Omitted Window target
 *
 * @see https://morioh.com/react-hook/useEventListener
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export declare function useEventListener<K extends keyof WindowEventMap>(event: K | Array<K>, listener: (event: WindowEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 2: Explicitly Window target
 *
 * @see https://morioh.com/react-hook/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export declare function useEventListener<K extends keyof WindowEventMap>(target: RefObject<Window> | Window | null, event: K | Array<K>, listener: (event: WindowEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 3: Explicitly Document target
 *
 * @see https://morioh.com/react-hook/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export declare function useEventListener<K extends keyof DocumentEventMap>(target: RefObject<Document> | Document | null, event: K | Array<K>, listener: (event: DocumentEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 4: Custom event target fallback
 *
 * @see https://morioh.com/react-hook/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export declare function useEventListener<K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(target: RefObject<HTMLElement> | HTMLElement | null | undefined, event: K | Array<K>, listener: (event: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
