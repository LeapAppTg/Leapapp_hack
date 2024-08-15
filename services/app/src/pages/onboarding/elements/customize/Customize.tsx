import { FC } from "react";
import { ContentWrapper, CustomizeIllustration } from "../../components";

type Props = {
    onNext?: () => any,
    step: number
}

export const Customize: FC<Props> = ({ onNext, step }) => {
    return (
        <ContentWrapper
            title="Customize and show your Leap!"
            description="Customise your Leap with unique looks and share them with other players!"
            onNext={onNext}
            step={step}
        >
            <CustomizeIllustration/>
        </ContentWrapper>
    )
}