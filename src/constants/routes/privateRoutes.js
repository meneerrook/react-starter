import { lazy, Suspense } from "react";
import sharedRoutes from "./sharedRoutes";

const DefaultLayout = lazy(() => import("layout/DefaultLayout"));
const HomePage = lazy(() => import("pages/HomePage"));

const privateRoutes = [
    {
        key: "root",
        path: "/",
        inMenu: false,
        element: <Suspense fallback={<></>}><DefaultLayout /></Suspense>,
        icon: null,
        children: [
            {
                key: "homepage",
                index: true,
                inMenu: false,
                element: <Suspense fallback={<></>}><HomePage /></Suspense>,
                icon: null,
                children: [],
            },
        ]
    },
    ...sharedRoutes
];

export default privateRoutes;