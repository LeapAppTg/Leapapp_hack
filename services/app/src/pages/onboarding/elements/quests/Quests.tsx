import { FC } from "react";
import { ContentWrapper, QuestIllustration } from "../../components";
import { PageTitleBackgroundColor } from "@components";

type Props = {
    onNext?: () => any,
    onSkip?: () => any
}

export const Quests: FC<Props> = ({ onNext, onSkip }) => {
    return (
        <ContentWrapper
            title="Quest platform"
            color={PageTitleBackgroundColor.Blue}
            description="Gain more games to feed your Leap and earn points. "
            onNext={onNext}
            onSkip={onSkip}
        >
            <QuestIllustration/>
        </ContentWrapper>
    )
}