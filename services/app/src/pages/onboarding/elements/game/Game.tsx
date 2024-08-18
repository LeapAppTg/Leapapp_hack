import { FC } from "react";
import { ContentWrapper, GameIllustration } from "../../components";

type Props = {
    onNext?: () => any,
    step: number
}

export const Game: FC<Props> = ({ onNext, step }) => {
    return (
        <ContentWrapper
            title="Catch falling tokens"
            description={<>Catch crypto, earn coins!<br/>Start and win now!</>}
            onNext={onNext}
            step={step}
        >
            <GameIllustration/>
        </ContentWrapper>
    )
}