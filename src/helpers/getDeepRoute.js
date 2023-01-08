export default function getDeepRoute (routes, propName, propValue, foundRoute) {
    if (!foundRoute) {
        for (let route of routes) {
            if (route[propName] === propValue) {
                foundRoute = route;
            } else {
                if (route?.children?.length) {
                    foundRoute = getDeepRoute(route.children, propName, propValue, foundRoute);

                    if (foundRoute) break;
                } else {
                    continue;
                }
            }
        }
    }

    return foundRoute;
}