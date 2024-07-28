import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AlertProps, AlertStatus } from "./Alert.t";
import { EnumMatcher, EnumToFCMatcher, TextXSRegular, classJoiner } from "@utils";
import { CircleIconWrapper, CircleIconWrapperColor } from "@components";
import { CheckmarkIcon, CloseIcon, IconFC } from "@icons";
import { useTelegram } from "@providers";
import animationData from "./confetti.json"
import Lottie from "react-lottie";

const statusIconMatcher = new EnumToFCMatcher<AlertStatus, IconFC, IconFC>(
    {
        [AlertStatus.Success]: CheckmarkIcon,
        [AlertStatus.Error]: CloseIcon
    },
    CheckmarkIcon
)

const statusIconColorMatcher = new EnumMatcher<AlertStatus, CircleIconWrapperColor, CircleIconWrapperColor.Green600>(
    {
        [AlertStatus.Success]: CircleIconWrapperColor.Green600,
        [AlertStatus.Error]: CircleIconWrapperColor.Red500
    },
    CircleIconWrapperColor.Green600
)

const hapticFeedbackMatcher = new EnumMatcher<AlertStatus, "success" | "error", "success">(
    {
        [AlertStatus.Success]: "success",
        [AlertStatus.Error]: "error"
    },
    "success"
)

export const Alert: FC<AlertProps> = ({
    message, status, remove, withConfetti
}) => {
    const [disappear, setDisappear] = useState<boolean>(false)
    const [expirationTime, setExpirationTime] = useState<number>(100)
    const [intervalID, setIntervalID] = useState<number>(0)
    const { triggerHapticFeedback } = useTelegram()

    const startTimer = () => {
        let interval = window.setInterval(() => {
            setExpirationTime(prev => {
                if (prev > 0) return prev - 20

                clearInterval(interval)
                return prev
            })
        }, 1000)

        setIntervalID(interval)
    }

    const pauseTimer = () => {
        window.clearInterval(intervalID)
    }

    const closeNotification = () => {
        pauseTimer()
        setDisappear(true)
        setTimeout(() => remove(), 500)
    }

    useEffect(() => {
        if (expirationTime === 0) closeNotification()
    }, [expirationTime])

    useEffect(() => {
        startTimer()
        triggerHapticFeedback({ type: "notification", notification_type: hapticFeedbackMatcher.match(status) })
    }, [])
    
    return (
        <div className={classJoiner(styles.alert, disappear ? styles.disappear : '')}>
            {
                status
                ?
                <CircleIconWrapper icon={statusIconMatcher.match(status)} color={statusIconColorMatcher.match(status)}/>
                :
                null
            }
            <p className={TextXSRegular.className}>
                {message}
            </p>
            {
                withConfetti
                ?
                <div className={styles.confetti}>
                    <Lottie
                        options={{
                            animationData,
                            loop: 0
                        }}
                    />
                </div>
                :
                null
            }
        </div>
    )
}