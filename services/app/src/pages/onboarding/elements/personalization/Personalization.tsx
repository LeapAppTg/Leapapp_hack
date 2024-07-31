import { Button, ButtonStyle, CircleIconWrapper, CircleIconWrapperColor, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { CheckmarkIcon, ClockIcon } from "@icons";
import { useTelegram } from "@providers";
import { FlexGapColumn, TextMMedium, TextXSRegular } from "@utils";
import { FC, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

export const Personalization: FC = () => {

    const [progress, setProgress] = useState<number>(0)
    const { triggerHapticFeedback } = useTelegram()

    useEffect(() => {
        const interval = setInterval(() => setProgress(prev => prev >= 400 ? prev : prev + 5), 100)
        return () => clearInterval(interval)
    })

    const [step, progressStep, progressDisplay] = useMemo(() => {
        let step = 1
        let progressStep = 1
        let progressDisplay: number

        if (progress >= 350) {
            progressStep = 5
            step = 5
            progressDisplay = 100
        } else if (progress > 300) {
            step = 4
            progressStep = 4
            progressDisplay = 2 * (progress - 300)
        } else if (progress > 250) {
            step = 4
            progressStep = 3
            progressDisplay = 100
        } else if (progress > 200) {
            step = 3
            progressStep = 3
            progressDisplay = 2 * (progress - 200)
        } else if (progress > 150) {
            step = 3
            progressStep = 2
            progressDisplay = 100
        } else if (progress > 100) {
            step = 2
            progressStep = 2
            progressDisplay = 2 * (progress - 100)
        } else if (progress > 50) {
            step = 2
            progressDisplay = 100
        } else {
            progressDisplay = 2 * progress
        }

        if (progressDisplay < 10) return [step, progressStep, `0${progressDisplay}`]
        return [step, progressStep, progressDisplay.toString()]
    }, [progress])

    useEffect(() => {
        if (step === 1) return
        triggerHapticFeedback({ type: "impact", impact_style: "light" })
    }, [step])

    return (
        <div className={styles.outter_wrapper}>
            <PageTitleBackground color={PageTitleBackgroundColor.Blue} className={styles.background}/>

            <div className={styles.wrapper}>

                <div className={styles.progress_wrapper}>
                    <div className={FlexGapColumn.className}>
                        <p className={TextMMedium.className}>
                            {progressDisplay}%
                        </p>
                        <p className={TextXSRegular.className}>
                            {
                                progressStep === 1
                                ?
                                "Vibing"
                                :
                                progressStep === 2
                                ?
                                "Customizing"
                                :
                                progressStep === 3
                                ?
                                "Boosting"
                                :
                                progressStep === 4
                                ?
                                "Grinding Leap"
                                :
                                "Done!"
                            }
                        </p>
                    </div>

                    <div className={styles.circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <circle fill="none" stroke="#5ED400" strokeDashoffset={350} stroke-width="4" stroke-mitterlimit="0" cx="50" cy="50" r="48" stroke-dasharray="360" stroke-linecap="round"transform="rotate(-90) translate(-100 0)">
                                <animate attributeName="stroke-dashoffset" values="350;55" dur="1.1s" begin="6.2s" fill="freeze"/>
                            </circle>
                        </svg>
                    </div>
                    <div className={styles.circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <circle fill="none" stroke="#4CC9F0" strokeDashoffset={350} stroke-width="4.4" stroke-mitterlimit="0" cx="50" cy="50" r="47.8" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90) translate(-100 0)">
                                <animate attributeName="stroke-dashoffset" values="350;55" dur="1.2s" begin="4.2s" fill="freeze"/>
                            </circle>
                        </svg>
                    </div>
                    <div className={styles.circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <circle fill="none" stroke="#F72585" strokeDashoffset={350} stroke-width="4.5" stroke-mitterlimit="0" cx="50" cy="50" r="47.75" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
                                <animate attributeName="stroke-dashoffset" values="350;55" dur="1.2s" begin="2.2s" fill="freeze"/>
                            </circle>
                        </svg>
                    </div>
                    <div className={styles.circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <circle fill="none" stroke="#FFC300" strokeDashoffset={350} stroke-width="4.8" stroke-mitterlimit="0" cx="50" cy="50" r="47.6" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
                                <animate attributeName="stroke-dashoffset" values="350;55" dur="1.2s" begin="0s" fill="freeze"/>
                            </circle>
                        </svg>
                    </div>
                </div>

                <div className={styles.steps}>
                    <Step isWaiting={step <= 1} color={CircleIconWrapperColor.Yellow} title="Creating a vibe"/>
                    <Step isWaiting={step <= 2} color={CircleIconWrapperColor.Pink} title="Customizing the app"/>
                    <Step isWaiting={step <= 3} color={CircleIconWrapperColor.Blue} title="Boosting bonuses"/>
                    <Step isWaiting={step <= 4} color={CircleIconWrapperColor.LightGreen} title="Gathering Leaps"/>
                </div>
            </div>

            
            <Button style={ButtonStyle.Primary} fillFullWidth disabled={step !== 5} linkTo="/streak">
                {step !== 5 ? 'Waiting...' : 'Next'}
            </Button>

        </div>
    )
}

type StepProps = {
    isWaiting: boolean,
    title: string,
    color: CircleIconWrapperColor
}

const Step: FC<StepProps> = ({
    color, isWaiting, title
}) => {
    return (
        <div className={styles.step}>
            {
                isWaiting
                ?
                <CircleIconWrapper color={CircleIconWrapperColor.Grey500} icon={ClockIcon}/>
                :
                <CircleIconWrapper color={color} icon={CheckmarkIcon}/>
            }
            <p className={TextXSRegular.className}>
                {title}
            </p>
        </div>
    )
}