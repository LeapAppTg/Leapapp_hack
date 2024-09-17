import { CircleIconWrapper, CircleIconWrapperColor } from "@components";
import { CheckmarkIcon, CloseIcon, IconFC } from "@icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTelegram } from "@providers";
import { EnumMatcher, EnumToFCMatcher, TextAlign, TextXSRegular, classJoiner } from "@utils";
import { FC, useEffect, useState } from "react";
import { AlertProps, AlertStatus } from "./Alert.t";
import styles from "./styles.module.css";

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
            <p className={TextXSRegular.update({ textAlign: TextAlign.Left }).className}>
                {message}
            </p>
            {
                withConfetti
                ?
                <div className={styles.confetti}>
                    <DotLottieReact
                        src="/animations/alert_confetti.lottie"
                        autoplay
                        width={"100%"}
                    />
                </div>
                :
                null
            }
        </div>
    )
}