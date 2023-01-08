import { useEffect, useRef } from "react";

export default function useDebounceEffect(cb, delay, values, runOnInitialize = false) {
    const didMountRef = useRef(null);

    useEffect(() => {
        if (!runOnInitialize && !didMountRef.current) {
            didMountRef.current = true;
            return;
        }

        const handler = setTimeout(() => {
            cb();
        }, delay);

        return () => clearTimeout(handler);
    }, values);
}