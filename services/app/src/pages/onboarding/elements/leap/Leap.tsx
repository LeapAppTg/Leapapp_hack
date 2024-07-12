import { FC } from "react";
import { ContentWrapper, LeapIllustration } from "../../components";

export const Leap: FC = () => {
    return (
        <ContentWrapper
            title="How about to take the leap?"
            description="Gain more games to feed your Le and earn points. Participate in activities and secure Leap airdrops."
            topButtonLabel="Continue"
            noSkip
        >
            <LeapIllustration/>
        </ContentWrapper>
    )
}