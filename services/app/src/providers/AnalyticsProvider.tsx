import { FC, PropsWithChildren, useEffect } from "react";
import { Analytics } from "@utils";

export const AnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        Analytics.init();
    }, []);

    return <>{children}</>;
};
