
import { selector } from "recoil"

import routesAtom from "store/routes";

export const initializedWithStates = selector({
    key: "initializedWithStates",
    get: ({ get }) => {
        const states = [
            { state: get(routesAtom), type: "object" }, 
        ];
        
        return states.every(({ state, type }) => validate(state, type));
    }
});

const validate = (value, type) => {
    return (value?.length > 0) && (typeof value === type);
}

