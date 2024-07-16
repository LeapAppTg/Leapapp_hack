import { FC } from "react";
import { ContentWrapper, GameIllustration } from "../../components";

type Props = {
    onNext?: () => any,
    onSkip?: () => any
}

export const Game: FC<Props> = ({ onNext, onSkip }) => {
    return (
        <ContentWrapper
            title="Timekiller for earning points"
            description="Gain more games to feed your Leap and earn points."
            onNext={onNext}
            onSkip={onSkip}
        >
            <GameIllustration/>
        </ContentWrapper>
    )
}