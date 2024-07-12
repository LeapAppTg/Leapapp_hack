import { FC } from "react";
import { ContentWrapper, GameIllustration } from "../../components";

export const Game: FC = () => {
    return (
        <ContentWrapper
            title="Timekiller for earning points"
            description="Gain more games to feed your Leap and earn points."
        >
            <GameIllustration/>
        </ContentWrapper>
    )
}