import { Button, ButtonStyle, CircleIconWrapper, CircleIconWrapperColor, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { CheckmarkIcon, ClockIcon } from "@icons";
import { FlexGapColumn, TextMMedium, TextXSRegular } from "@utils";
import { FC, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

export const Personalization: FC = () => {

    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => setProgress(prev => prev >= 400 ? prev : prev + 5), 100)
        return () => clearInterval(interval)
    })

    const [step, progressDisplay] = useMemo(() => {
        let step = 1
        let progressDisplay = progress
        if (progress === 400) {
            step = 5
            progressDisplay = 100
        } else if (progress > 300) {
            step = 4
            progressDisplay = progress - 300
        }
        else if (progress > 200) {
            step = 3
            progressDisplay = progress - 200
        }
        else if (progress > 100) {
            step = 2
            progressDisplay = progress - 100
        }

        if (progressDisplay < 10) return [step, `0${progressDisplay}`]
        return [step, progressDisplay.toString()]
    }, [progress])

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
                                step === 1
                                ?
                                "Rewarding"
                                :
                                step === 2
                                ?
                                "Personalizing"
                                :
                                step === 3
                                ?
                                "Customizing"
                                :
                                step === 4
                                ?
                                "Cooking"
                                :
                                "Done!"
                            }
                        </p>
                    </div>

                    <div className={styles.circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <circle fill="none" stroke="#5ED400" strokeDashoffset={350} stroke-width="4" stroke-mitterlimit="0" cx="50" cy="50" r="48" stroke-dasharray="360" stroke-linecap="round"transform="rotate(-90) translate(-100 0)">
                                <animate attributeName="stroke-dashoffset" values="350;55" dur="2s" begin="6s" fill="freeze"/>
                            </circle>
                        </svg>
                    </div>
                    <div className={styles.circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <circle fill="none" stroke="#4CC9F0" strokeDashoffset={350} stroke-width="4.4" stroke-mitterlimit="0" cx="50" cy="50" r="47.8" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90) translate(-100 0)">
                                <animate attributeName="stroke-dashoffset" values="350;55" dur="2s" begin="4s" fill="freeze"/>
                            </circle>
                        </svg>
                    </div>
                    <div className={styles.circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <circle fill="none" stroke="#F72585" strokeDashoffset={350} stroke-width="4.5" stroke-mitterlimit="0" cx="50" cy="50" r="47.75" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
                                <animate attributeName="stroke-dashoffset" values="350;55" dur="2s" begin="2s" fill="freeze"/>
                            </circle>
                        </svg>
                    </div>
                    <div className={styles.circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <circle fill="none" stroke="#FFC300" strokeDashoffset={350} stroke-width="4.8" stroke-mitterlimit="0" cx="50" cy="50" r="47.6" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
                                <animate attributeName="stroke-dashoffset" values="350;55" dur="2s" begin="0s" fill="freeze"/>
                            </circle>
                        </svg>
                    </div>
                </div>

                <div className={styles.steps}>
                    <div className={styles.step}>
                        {
                            step === 1
                            ?
                            <CircleIconWrapper color={CircleIconWrapperColor.Grey500} icon={ClockIcon}/>
                            :
                            <CircleIconWrapper color={CircleIconWrapperColor.Yellow} icon={CheckmarkIcon}/>
                        }
                        <p className={TextXSRegular.className}>
                            Daily reward
                        </p>
                    </div>
                    <div className={styles.step}>
                        {
                            step <= 2
                            ?
                            <CircleIconWrapper color={CircleIconWrapperColor.Grey500} icon={ClockIcon}/>
                            :
                            <CircleIconWrapper color={CircleIconWrapperColor.Pink} icon={CheckmarkIcon}/>
                        }
                        <p className={TextXSRegular.className}>
                            Personalizing app
                        </p>
                    </div>
                    <div className={styles.step}>
                        {
                            step <= 3
                            ?
                            <CircleIconWrapper color={CircleIconWrapperColor.Grey500} icon={ClockIcon}/>
                            :
                            <CircleIconWrapper color={CircleIconWrapperColor.Blue} icon={CheckmarkIcon}/>
                        }
                        <p className={TextXSRegular.className}>
                            Customising app
                        </p>
                    </div>
                    <div className={styles.step}>
                        {
                            step <= 4
                            ?
                            <CircleIconWrapper color={CircleIconWrapperColor.Grey500} icon={ClockIcon}/>
                            :
                            <CircleIconWrapper color={CircleIconWrapperColor.LightGreen} icon={CheckmarkIcon}/>
                        }
                        <p className={TextXSRegular.className}>
                            Gathering points
                        </p>
                    </div>
                </div>
            </div>

            
            <Button style={ButtonStyle.Primary} fillFullWidth disabled={step !== 5} linkTo="/streak">
                Next
            </Button>

        </div>
    )
}