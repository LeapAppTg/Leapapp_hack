import { HeroThug, TicketEmoji } from "@assets";
import { AnimatedSquares, Button, ButtonStyle, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { IconSize, ShareIcon } from "@icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAuth, useTelegram } from "@providers";
import { postEndGame } from "@services";
import { FlexGapRow4, TextXLMedium, TextXSRegular, TextXXLMedium } from "@utils";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameState, useGame } from "../../providers";
import styles from "./styles.module.css";

export const EndScreen: FC = () => {
    const { score, gameState, reset } = useGame()
    const { authToken } = useAuth()
    const [scoreSubmitted, setScoreSubmitted] = useState<boolean>(false)
    const navigate = useNavigate()
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)
    const { shareLink } = useTelegram()
    const { data: inviteLink } = useData(ApiRoutes.GetInviteLink)

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

    function share () {
        if (!inviteLink) return
        shareLink(inviteLink.inviteLink)
    }

    if (!scoreSubmitted) return null
    
    return (
        <div className={styles.wrapper}>
            {
                gameState === GameState.BombEnd
                ?
                <div className={styles.confetti_bg}>
                    <DotLottieReact
                        autoplay
                        src="/animations/explosion.lottie"
                    />
                </div>
                :
                <div className={styles.confetti_bg}>
                    <DotLottieReact
                        autoplay
                        src="/animations/win_confetti.lottie"
                    />
                </div>
            }
            <TelegramEmoji size={TelegramEmojiSize.XXLarge} type={gameState === GameState.BombEnd ? TelegramEmojiType.Bomb : TelegramEmojiType.Lightning}/>
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