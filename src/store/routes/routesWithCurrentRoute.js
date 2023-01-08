
import { selector } from "recoil";
import locationAtom from "store/location";
import routesAtom from "store/routes";
import getDeepRoute from "helpers/getDeepRoute";

export const routesWithCurrentRoute = selector({
    key: "routesWithCurrentRoute",
    get: ({ get }) => {
        const location = get(locationAtom);
        const routes = get(routesAtom);

        if (routes?.length) {
            let route;
            let segments = location.pathname.split("/");
            
            if (segments.length) {
                route = getDeepRoute(routes, "path", segments[segments.length - 1]);
            }
            
            return route;
        }
    }
});