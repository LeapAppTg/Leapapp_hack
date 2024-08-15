import { FC } from "react";
import { AirdropIllustration, ContentWrapper } from "../../components";

type Props = {
    onNext?: () => any,
    step: number
}

export const Airdrop: FC<Props> = ({ onNext, step }) => {
    return (
        <ContentWrapper
            title="Use coins to get an AirDrop"
            description="Be unique, have fun, and start earning. Good luck!"
            onNext={onNext}
            step={step}
        >
            <AirdropIllustration/>
        </ContentWrapper>
    )
}