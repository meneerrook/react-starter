import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import routesAtom  from "store/routes";
import { hasProps } from "utils";
import getDeepRoute from "helpers/getDeepRoute";

export default function useResolveRoutePath (routeKey) {
    const routes = useRecoilValue(routesAtom);
    const [path, setPath] = useState("/");
    const [routesOrderedByPaths, setRoutesOrderedByPaths] = useState()
    const [routeToResolve, setRouteToResolve] = useState();
    
    useEffect(() => {
        if (routes?.length && routeKey?.length) {
            setRoutesOrderedByPaths(getRoutePaths(routes));
            setRouteToResolve(getDeepRoute(routes, "key", routeKey));
        }
    }, [routes, routeKey]);

    useEffect(() => {
        if (routesOrderedByPaths?.length && hasProps(routeToResolve)) {
            let foundRoute = routesOrderedByPaths.find(items => {
                return items[items.length - 1] === routeToResolve.path;
            });

            if (foundRoute) {
                foundRoute.shift();
                setPath(`/${foundRoute.join("/")}`);
            }
        }
    }, [routesOrderedByPaths, routeToResolve]);

    return path;
}

function getRoutePaths (routes, paths = [], slugs = []) {
    for (let route of routes) {
        let slug = [...slugs, route.path];

        paths.push(slug);

        if (route?.children?.length) {
            getRoutePaths(route.children, paths, slug);
        }
    }

    return paths;
}