import { RefObject, useEffect, useRef } from 'react';
import { isBrowser, isString } from './helper';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

// export type GeneralEventListener<E = Event> = (evt: E) => void;

// export type ElementEventListener<K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;

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
// export function useEventListener<E extends keyof WindowEventMap>(event: E, listener: GeneralEventListener<E>, options?: boolean | AddEventListenerOptions): void;
export function useEventListener<K extends keyof WindowEventMap>(event: K | Array<K>, listener: (event: WindowEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;

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
//export function useEventListener<E extends keyof WindowEventMap>(target: Window, event: E, listener: GeneralEventListener<E>, options?: boolean | AddEventListenerOptions): void;

export function useEventListener<K extends keyof WindowEventMap>(
    target: RefObject<Window> | Window | null,
    event: K | Array<K>,
    listener: (event: WindowEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void;
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
//export function useEventListener<E extends keyof DocumentEventMap>(target: RefObject<Document> | Document | null, event: E, istener: GeneralEventListener<E>, options?: boolean | AddEventListenerOptions): void;
export function useEventListener<K extends keyof DocumentEventMap>(
    target: RefObject<Document> | Document | null,
    event: K | Array<K>,
    listener: (event: DocumentEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void;

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
export function useEventListener<K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(
    target: RefObject<HTMLElement> | HTMLElement | null | undefined,
    event: K | Array<K>,
    listener: (event: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void;

export function useEventListener(...args: any[]) {
    let target: any = isBrowser ? window : undefined;
    let event: string | string[];
    let listener: EventListener;
    let options: boolean | AddEventListenerOptions;

    isString(args[0]) || Array.isArray(args[0]) ? ([event, listener, options] = args) : ([target, event, listener, options] = args);

    const savedListener = useRef<EventListener>(listener);

    useIsomorphicLayoutEffect(() => {
        savedListener.current = listener;
    }, [listener]);

    useEffect(() => {
        const el = target && 'current' in target ? target.current : target;

        if (!isBrowser || !el) return;

        const events = Array.isArray(event) ? event : [event];

        events.forEach((e) => {
            el.addEventListener(e, savedListener.current, options);
        });

        return () => {
            events.forEach((e) => {
                el.removeEventListener(e, savedListener.current, options);
            });
        };
    }, [event, target, options]);
}
