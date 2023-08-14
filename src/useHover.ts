import { useRef, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useHover() {
    const [hovering, setHovering] = useState<Boolean>(false);
    const ref = useRef<HTMLElement>(null);

    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    useEventListener(ref, 'mouseenter', handleMouseEnter);
    useEventListener(ref, 'mouseleave', handleMouseLeave);

    return [ref, hovering];
}
