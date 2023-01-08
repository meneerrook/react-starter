import { useRoutes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import routesAtom from "store/routes";
import { initializedWithStates } from "store/initialized/initializedWithStates";
import useRoutesStore from "hooks/store/useRoutesStore";
import useLocationStore from "hooks/store/useLocationStore";

export function App () {
    useRoutesStore();
    useLocationStore();

    const initialized = useRecoilValue(initializedWithStates);
    const routes = useRecoilValue(routesAtom);
    const element = useRoutes(routes ?? []);

    console.log(initialized);

    return (!initialized) ? (
        <>Loading...</>
    ) : (
        <>{element}</> 
    );
}