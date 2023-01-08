import PropTypes from "prop-types";
import { useOutlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { routesWithCurrentRoute } from "store/routes";
import { useAuth0, UserAccess } from "@divide/ois-react-components";
import PageBreadcrumbs from "parts/PageBreadcrumbs";
import NoPageAccess from "parts/NoPageAccess";
import styles from "./Page.module.css";

export function Page({ children }) {
    const childRoute = useOutlet();
    const currentRoute = useRecoilValue(routesWithCurrentRoute);

    return (
        <section className={styles["wrapper"]}>
            <PageBreadcrumbs />

            <div className={styles["content"]}>
                {currentRoute ? (
                    <UserAccess scopes={currentRoute.scopes} renderDenied={<NoPageAccess />} useAuth0={useAuth0}>
                        <>{childRoute ? childRoute : children}</>
                    </UserAccess>
                ) : (
                    <>{children}</>
                )}
            </div>
        </section>
    );
}

Page.propTypes = {
    children: PropTypes.any.isRequired
};