import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import locationAtom from "store/location";

export default function useLocationStore () {
    const location = useLocation();
    const setLocation = useSetRecoilState(locationAtom);
    
    useEffect(() => {
        setLocation(location);
    }, [location, setLocation]);
}