import { FC } from "react";
import { ContentWrapper, LeapIllustration } from "../../components";

type Props = {
    onNext?: () => any
}

export const Leap: FC<Props> = ({ onNext }) => {
    return (
        <ContentWrapper
            title="How about to take the leap?"
            description={
                <>Earn Leaps, invite frens, explore web3 and have fun.<br/>And secure Leap airdrop.</>
            }
            topButtonLabel="Continue"
            noSkip
            onNext={onNext}
            fillFullHeight
        >
            <LeapIllustration/>
        </ContentWrapper>
    )
}