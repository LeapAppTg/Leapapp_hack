import { PageTitleBackgroundColor } from "@components";
import { FC } from "react";
import { ContentWrapper, LearningIllustration } from "../../components";

export const Learning: FC = () => {
    return (
        <ContentWrapper
            title="Learning center"
            color={PageTitleBackgroundColor.Green}
            description="Gain more games to feed your Leap and earn points."
        >
            <LearningIllustration/>
        </ContentWrapper>
    )
}