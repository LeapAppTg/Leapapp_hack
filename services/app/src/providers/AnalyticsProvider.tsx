import { FC, PropsWithChildren, useEffect } from "react";
import Analytics from "../utils/analytics";

export const AnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        Analytics.init();
    }, []);

    return <>{children}</>;
};
