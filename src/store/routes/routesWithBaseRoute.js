
import { selector } from "recoil";
import locationAtom from "store/location";
import routesAtom from "store/routes";
import getDeepRoute from "helpers/getDeepRoute";

export const routesWithBaseRoute = selector({
    key: "routesWithBaseRoute",
    get: ({ get }) => {
        const location = get(locationAtom);
        const routes = get(routesAtom);

        if (routes?.length) {
            let resolvedRoutes = getDeepRoute(routes, "key", "root")?.children ?? [];
            let segments = location.pathname.split("/").filter(segment => !!segment);
            let route = resolvedRoutes[0];
            
            if (segments.length) {
                route = resolvedRoutes.find(route => route.path === segments[0]);
            }

            return route;
        }
    }
});