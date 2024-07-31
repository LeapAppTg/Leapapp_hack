import { FC } from "react";
import { ContentWrapper, GameIllustration } from "../../components";

type Props = {
    onNext?: () => any,
    onSkip?: () => any
}

export const Game: FC<Props> = ({ onNext, onSkip }) => {
    return (
        <ContentWrapper
            title="Catch items and earn Leap Points"
            description="Le really likes to eat different items, don't forget to feed him."
            onNext={onNext}
            onSkip={onSkip}
            fillFullHeight
        >
            <GameIllustration/>
        </ContentWrapper>
    )
}