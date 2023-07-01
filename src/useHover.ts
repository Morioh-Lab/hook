import { useEffect, useRef, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useHover() {
    const [hovering, setHovering] = useState<Boolean>(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        // const node = ref?.current;

        if (!ref?.current) return;

        const handleMouseEnter = () => setHovering(true);
        const handleMouseLeave = () => setHovering(false);

        useEventListener('mouseenter', handleMouseEnter, ref);
        useEventListener('mouseleave', handleMouseLeave, ref);

        // node.addEventListener('mouseenter', handleMouseEnter);
        // node.addEventListener('mouseleave', handleMouseLeave);

        // return () => {
        //     node.removeEventListener('mouseenter', handleMouseEnter);
        //     node.removeEventListener('mouseleave', handleMouseLeave);
        // };
    }, []);

    return [ref, hovering];
}
