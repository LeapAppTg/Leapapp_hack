import { FC } from "react";
import { Balance, GamePreview, HourlyReward } from "./components";

export const HomePage: FC = () => {
    return (
        <>
        <Balance/>
        <GamePreview/>
        <HourlyReward/>
        </>
    )
}