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
            title="Quest hub"
            color={PageTitleBackgroundColor.Blue}
            description="I'm preparing quests for us to get to know each other better."
            onNext={onNext}
            onSkip={onSkip}
            fillFullHeight
        >
            <QuestIllustration/>
        </ContentWrapper>
    )
}