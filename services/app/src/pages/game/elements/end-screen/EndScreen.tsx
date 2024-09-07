import { HeroThug, TicketEmoji } from "@assets";
import { AnimatedSquares, Button, ButtonStyle, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { IconSize, ShareIcon } from "@icons";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAuth, useTelegram } from "@providers";
import { postEndGame } from "@services";
import { FlexGapRow4, TextXLMedium, TextXSRegular, TextXXLMedium } from "@utils";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { GameState } from "../../config";
import mixpanel from "mixpanel-browser";

type Props = {
    score: number,
    gameState: GameState,
    reset: () => any
}

export const EndScreen: FC<Props> = ({ gameState, reset, score }) => {
    const { authToken } = useAuth()
    const [scoreSubmitted, setScoreSubmitted] = useState<boolean>(false)
    const navigate = useNavigate()
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)
    const { shareLink } = useTelegram()
    const { data: inviteLink } = useData(ApiRoutes.GetInviteLink)

    const [lottie, setLottie] = useState<DotLottie | null>(null)
    const dotLottieRefCallback = (lottie: DotLottie) => {
        setLottie(lottie)
    }

    useEffect(() => {
        if (!lottie) return
        let interval: NodeJS.Timeout
        const timeout = setTimeout(() => {
            lottie.play()
            interval = setInterval(() => lottie.play(), 3_000)
        }, 1_200)
        return () => {
            clearTimeout(timeout)
            if (interval) clearInterval(interval)
        }
    }, [lottie])

    useEffect(() => {
        if (scoreSubmitted) return
        let retries = 0
        async function submitScore () {
            try {
                await postEndGame(authToken, score)
                setScoreSubmitted(true)
                mixpanel.track("end_game", { "points": score, "end_type": gameState === GameState.BombEnd ? "bomb" : "time" })
            } catch (e) {
                if (retries <= 2) {
                    retries += 1
                    return submitScore()
                } else navigate('/')
            }
        }
        submitScore()
    }, [scoreSubmitted])

    function share () {
        if (!inviteLink) return
        shareLink(inviteLink.inviteLink)
        mixpanel.track("share_invite_link")
    }

    if (!scoreSubmitted) return null
    
    return (
        <div className={styles.wrapper}>
            {
                gameState === GameState.BombEnd
                ?
                null
                :
                <div className={styles.confetti_bg}>
                    <DotLottieReact
                        autoplay
                        src="/animations/win_confetti.lottie"
                    />
                </div>
            }
            <div className={FlexGapRow4.update({ relativePosition: true }).className}>
                {
                    gameState === GameState.BombEnd
                    ?
                    <div className={styles.explosion_bg}>
                        <DotLottieReact
                            src="/animations/explosion.lottie"
                            dotLottieRefCallback={dotLottieRefCallback}
                        />
                    </div>
                    :
                    null
                }
                <TelegramEmoji size={TelegramEmojiSize.XXLarge} type={gameState === GameState.BombEnd ? TelegramEmojiType.Bomb : TelegramEmojiType.Lightning}/>
            </div>
            <p className={TextXXLMedium.className}>
                {
                    gameState === GameState.BombEnd
                    ?
                    'Leap ate the bomb'
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
            <Button style={ButtonStyle.Tertiary} fillFullWidth onClick={share}>
                <ShareIcon size={IconSize.Medium}/>
                Invite friends for
                <TicketEmoji width={20} height={20}/>
            </Button>
            {
                userProfile?.gameTickets
                ?
                <Button style={ButtonStyle.Primary} fillFullWidth onClick={reset}>
                    Play&nbsp;&nbsp;|
                    <TicketEmoji width={20} height={20}/>
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