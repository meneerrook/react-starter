import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import publicRoutes from "constants/routes/publicRoutes";
import privateRoutes from "constants/routes/privateRoutes";
import routesAtom from "store/routes";

export default function useRoutesStore () {
    const setRoutes = useSetRecoilState(routesAtom);
    const authenticated = false;

    useEffect(() => {
        if (authenticated) {
            setRoutes(privateRoutes);
        } else {
            setRoutes(publicRoutes);
        }
    }, [authenticated, setRoutes]);
}