import { FC, useState } from "react";
import { Airdrop, Customize, Game, Invite, Upgrade, WelcomeBonus } from "./elements";

export const OnboardingPage: FC = () => {

    const [step, setStep] = useState<number>(1)

    return (
        <>
        {
            step === 1
            ?
            <Game onNext={() => setStep(2)} step={1}/>
            :
            step === 2
            ?
            <Upgrade onNext={() => setStep(3)} step={2}/>
            :
            step === 3
            ?
            <Customize onNext={() => setStep(4)} step={3}/>
            :
            step === 4
            ?
            <Invite onNext={() => setStep(5)} step={4}/>
            :
            step === 5
            ?
            <Airdrop onNext={() => setStep(6)} step={5}/>
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