import { FC } from "react";
import { ContentWrapper, LeapIllustration } from "../../components";

type Props = {
    onNext?: () => any
}

export const Leap: FC<Props> = ({ onNext }) => {
    return (
        <ContentWrapper
            title="How about to take the leap?"
            description="Gain more games to feed your Le and earn points. Participate in activities and secure Leap airdrops."
            topButtonLabel="Continue"
            noSkip
            onNext={onNext}
        >
            <LeapIllustration/>
        </ContentWrapper>
    )
}