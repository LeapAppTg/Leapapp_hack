import { FC } from "react";
import { ContentWrapper, UpgradeIllustration } from "../../components";

type Props = {
    onNext?: () => any,
    step: number
}

export const Upgrade: FC<Props> = ({ onNext, step }) => {
    return (
        <ContentWrapper
            title={<>Upgrade and<br/>increase earnings!</>}
            description="Level up your abilities to increase your income."
            onNext={onNext}
            step={step}
        >
            <UpgradeIllustration/>
        </ContentWrapper>
    )
}