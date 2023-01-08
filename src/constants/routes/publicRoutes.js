import { lazy, Suspense } from "react";
import sharedRoutes from "./sharedRoutes";

const LoginPage = lazy(() => import("pages/LoginPage"));

const privateRoutes = [
    {
        key: "root",
        path: "/",
        inMenu: false,
        element: <Suspense fallback={<></>}><LoginPage /></Suspense>,
        icon: null,
        children: []
    },
    ...sharedRoutes
];

export default privateRoutes;