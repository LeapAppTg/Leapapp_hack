import { HeroGood } from "@assets";
import { AlertStatus, Loader as LoaderComponent } from "@components";
import { postStartGame } from "@services";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameState, useGame } from "../../providers";
import styles from "./styles.module.css";
import { useAlerts, useAuth } from "@providers";
import { ApiError } from "@builders";
import { ApiRoutes, useData } from "@hooks";

export const Loader: FC = () => {
    const { setGameState } = useGame()
    const { authToken } = useAuth()
    const { sendAlert } = useAlerts()
    const [gameSubmitted, setGameSubmitted] = useState<boolean>(false)
    const navigate = useNavigate()
    const { data: user, mutate: mutateUser } = useData(ApiRoutes.GetUserProfile)

    useEffect(() => {
        if (gameSubmitted) return
        async function submitGame () {
            try {
                await postStartGame(authToken)
                setGameSubmitted(true)
                mutateUser(user => user ? { ...user, gameTickets: user.gameTickets - 1 } : undefined)
                const timeout = setTimeout(() => setGameState(GameState.Play), 1500)
                return () => clearTimeout(timeout)
            } catch (e) {
                navigate('/')
                sendAlert({ status: AlertStatus.Error, message: ApiError.isApiError(e) && e.detail ? e.detail : 'Something went wrong' })
            }
        }
        submitGame()
    }, [gameSubmitted])

    if (!gameSubmitted) return <LoaderComponent/>

    return (
        <div>
            <svg className={styles.item} xmlns="http://www.w3.org/2000/svg" width="260" height="330" viewBox="0 0 260 330" fill="none">
                <path d="M47.4627 330.001L0 286.12V228.359H83.7313V252.986L97.1642 266.419H162.537L175.97 252.986V203.732L162.537 190.747H68.0597V128.061H162.537L175.97 114.628V77.0159L162.537 63.5831H97.1642L83.7313 77.0159V101.643H0V43.8816L47.0149 0.000976562H210L259.701 49.7025V126.717L226.567 159.404L259.701 192.091V280.299L210 330.001H47.4627Z" fill="white"/>
            </svg>
            <svg className={styles.item} xmlns="http://www.w3.org/2000/svg" width="262" height="330" viewBox="0 0 262 330" fill="none">
                <path d="M0 330.001V252.986L175.075 104.777V77.0159L161.642 63.5831H102.537L89.1045 77.0159V111.494H5.37314V43.8816L52.3881 0.000976562H211.343L258.806 43.8816V132.538L101.194 263.285H261.045V330.001H0Z" fill="white"/>
            </svg>
            {/* <svg className={styles.item} xmlns="http://www.w3.org/2000/svg" width="174" height="331" viewBox="0 0 174 331" fill="none">
                <path d="M0.0146484 330.63V264.361H45.2385V67.3463H4.49226V0.629883H128.97V264.361H173.746V330.63H0.0146484Z" fill="white"/>
            </svg> */}
            <svg className={styles.item} xmlns="http://www.w3.org/2000/svg" width="446" height="130" viewBox="0 0 446 130" fill="none">
                <path d="M5.70908 130V103.541H73.4431L79.6168 97.3677V82.9037L73.4431 76.73H20.1731L0.59375 56.9742V19.5794L20.1731 0H105.193V26.4586H39.2233L33.0497 32.6323V44.0977L39.2233 50.2714H92.4933L112.073 69.8507V110.421L92.4933 130H5.70908Z" fill="white"/>
                <path d="M150.469 130L131.948 112.89V58.3853H125.246V37.924H133.183L143.237 11.6418H164.933V37.924H179.397V58.3853H164.933V104.247L169.696 109.009H183.102V130H150.469Z" fill="white"/>
                <path d="M212.349 130L192.77 110.421V90.8412L212.349 71.2619H256.271V65.0882L249.921 58.7381H203.706V37.924H269.5L289.256 57.5034V130H256.271V117.476L244.1 130H212.349ZM231.752 112.008H241.278L256.271 97.0149V87.6662H231.752L225.579 93.8399V105.834L231.752 112.008Z" fill="white"/>
                <path d="M310.394 130V37.7476H343.379V52.2117L359.078 37.924H377.07V67.3813H350.611L343.379 73.9077V130H310.394Z" fill="white"/>
                <path d="M413.333 130L394.812 112.89V58.3853H388.109V37.924H396.047L406.101 11.6418H427.797V37.924H442.261V58.3853H427.797V104.247L432.56 109.009H445.965V130H413.333Z" fill="white"/>
            </svg>
            <HeroGood className={styles.hero}/>
        </div>
    )
}