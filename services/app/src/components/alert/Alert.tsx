import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AlertProps, AlertStatus } from "./Alert.t";
import { EnumMatcher, EnumToFCMatcher, TextXSRegular, classJoiner } from "@utils";
import { CircleIconWrapper, CircleIconWrapperColor } from "@components";
import { CheckmarkIcon, CloseIcon } from "@icons";

const statusIconMatcher = new EnumToFCMatcher<AlertStatus>(
    {
        [AlertStatus.Success]: CheckmarkIcon,
        [AlertStatus.Error]: CloseIcon
    },
    undefined
)

const statusIconColorMatcher = new EnumMatcher<AlertStatus, CircleIconWrapperColor, CircleIconWrapperColor.Green600>(
    {
        [AlertStatus.Success]: CircleIconWrapperColor.Green600,
        [AlertStatus.Error]: CircleIconWrapperColor.Red500
    },
    CircleIconWrapperColor.Green600
)

export const Alert: FC<AlertProps> = ({
    message, status, remove
}) => {
    const [disappear, setDisappear] = useState<boolean>(false)
    const [expirationTime, setExpirationTime] = useState<number>(100)
    const [intervalID, setIntervalID] = useState<number>(0)

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

    useEffect(() => startTimer(), [])
    
    return (
        <div className={classJoiner(styles.alert, disappear ? styles.disappear : null)}>
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
        </div>
    )
}