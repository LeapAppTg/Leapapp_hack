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
            title="Gamified learning"
            color={PageTitleBackgroundColor.Green}
            description="The free, fun and effective way to explore crypto!"
            onNext={onNext}
            onSkip={onSkip}
            fillFullHeight
        >
            <LearningIllustration/>
        </ContentWrapper>
    )
}