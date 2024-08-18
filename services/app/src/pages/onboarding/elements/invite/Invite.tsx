import { FC } from "react";
import { ContentWrapper, InviteIllustration } from "../../components";

type Props = {
    onNext?: () => any,
    step: number
}

export const Invite: FC<Props> = ({ onNext, step }) => {
    return (
        <ContentWrapper
            title={<>Invite friends and<br/>earn together</>}
            description="Have fun and earn together with your friends."
            onNext={onNext}
            step={step}
        >
            <InviteIllustration/>
        </ContentWrapper>
    )
}