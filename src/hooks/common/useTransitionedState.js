import { useCallback, useState, useTransition } from "react";

export default function useTransitionedState (defaultValue) {
    const [isPending, startTransition] = useTransition(); 
    const [value, setValue] = useState(defaultValue);
    
    const handleValueChange = useCallback((givenValue) => {
        startTransition(() => {
            setValue(givenValue);
        });
    }, []);

    return [
        isPending,
        value,
        handleValueChange
    ];
}