import { PageTitleBackgroundColor } from "@components";
import { FC } from "react";
import { ContentWrapper, LearningIllustration } from "../../components";

type Props = {
    onNext?: () => any,
    onSkip?: () => any
}

export const Learning: FC<Props> = ({ onNext, onSkip }) => {
    return (
        <ContentWrapper
            title="Learning center"
            color={PageTitleBackgroundColor.Green}
            description="Gain more games to feed your Leap and earn points."
            onNext={onNext}
            onSkip={onSkip}
        >
            <LearningIllustration/>
        </ContentWrapper>
    )
}