import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AnimatedSquares, Button, ButtonStyle, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { FlexGapRow4, TextXLMedium, TextXSRegular, TextXXLMedium } from "@utils";
import { GameState, useGame } from "../../providers";
import { HeroThug } from "@assets";
import confettiData from "./confetti.json"
import explosionData from "./explosion.json"
import Lottie from "react-lottie";
import { postEndGame } from "@services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@providers";
import { ApiRoutes, useData } from "@hooks";
import { IconSize, ShareIcon } from "@icons";

export const EndScreen: FC = () => {
    const { score, gameState, reset } = useGame()
    const { authToken } = useAuth()
    const [scoreSubmitted, setScoreSubmitted] = useState<boolean>(false)
    const navigate = useNavigate()
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)

    useEffect(() => {
        if (scoreSubmitted) return
        let retries = 0
        async function submitScore () {
            try {
                await postEndGame(authToken, score)
                setScoreSubmitted(true)
            } catch (e) {
                if (retries <= 2) {
                    retries += 1
                    return submitScore()
                }
                else navigate('/')
            }
        }
        submitScore()
    }, [scoreSubmitted])

    if (!scoreSubmitted) return null
    
    return (
        <div className={styles.wrapper}>
            {
                gameState === GameState.BombEnd
                ?
                <div className={styles.confetti_bg}>
                    <Lottie
                        options={{
                            loop: 0,
                            autoplay: true,
                            animationData: explosionData
                        }}
                        isClickToPauseDisabled
                    />
                </div>
                :
                <div className={styles.confetti_bg}>
                    <Lottie
                        options={{
                            loop: 0,
                            autoplay: true,
                            animationData: confettiData
                        }}
                        isClickToPauseDisabled
                    />
                </div>
            }
            <TelegramEmoji size={TelegramEmojiSize.XXLarge} type={gameState === GameState.BombEnd ? TelegramEmojiType.Bomb : TelegramEmojiType.Lightning}/>
            <p className={TextXXLMedium.className}>
                {
                    gameState === GameState.BombEnd
                    ?
                    'Leap ate the bomb :('
                    :
                    'Great job!'
                }
            </p>
            <div className={FlexGapRow4.className}>
                <HeroThug width={40} height={40}/>
                <p className={TextXLMedium.className}>
                    {score.format()}
                </p>
            </div>
            <AnimatedSquares/>
            <p className={TextXSRegular.className}>
                {
                    gameState === GameState.BombEnd
                    ?
                    'Next time try to avoid the bombs, we believe in you!'
                    :
                    `You're awesome today, share your achievement with your friends.`
                }
            </p>
            <Button style={ButtonStyle.Tertiary} fillFullWidth linkTo="/referrals">
                <ShareIcon size={IconSize.Medium}/>
                Invite friends for
                <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Ticket}/>
            </Button>
            {
                userProfile?.gameTickets
                ?
                <Button style={ButtonStyle.Primary} fillFullWidth onClick={reset}>
                    Play&nbsp;&nbsp;|
                    <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Ticket}/>
                    {userProfile.gameTickets.format()} left
                </Button>
                :
                <Button style={ButtonStyle.Primary} fillFullWidth linkTo="/">
                    Continue
                </Button>
            }
        </div>
    )
}