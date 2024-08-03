import { FC, useState } from "react";
import { Game, Hello, Leap, Learning, Quests, WelcomeBonus } from "./elements";

export const OnboardingPage: FC = () => {

    const [step, setStep] = useState<number>(1)

    return (
        <>
        {
            step === 1
            ?
            <Hello onNext={() => setStep(2)}/>
            :
            step === 2
            ?
            <Leap onNext={() => setStep(3)}/>
            :
            step === 3
            ?
            <Game onNext={() => setStep(4)} onSkip={() => setStep(6)}/>
            :
            step === 4
            ?
            <Quests onNext={() => setStep(5)} onSkip={() => setStep(6)}/>
            :
            step === 5
            ?
            <Learning onNext={() => setStep(6)} onSkip={() => setStep(6)}/>
            :
            step === 6
            ?
            <WelcomeBonus/>
            :
            null
        }
        </>
    )
}