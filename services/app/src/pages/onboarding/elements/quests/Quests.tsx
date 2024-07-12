import { FC } from "react";
import { ContentWrapper, QuestIllustration } from "../../components";
import { PageTitleBackgroundColor } from "@components";

export const Quests: FC = () => {
    return (
        <ContentWrapper
            title="Quest platform"
            color={PageTitleBackgroundColor.Blue}
            description="Gain more games to feed your Leap and earn points. "
        >
            <QuestIllustration/>
        </ContentWrapper>
    )
}