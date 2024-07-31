import { CoinsIlustration, DialogueCloud } from "@assets";
import { Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { TextColor, TextWeight, TextXSRegular } from "@utils";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
    onNext?: () => any
}

export const Hello: FC<Props> = ({ onNext }) => {

    const [disabled, setDisabled] = useState(true)

    const finalPhrases = [
        "Hi, I'm Le.",
        "And I'm going to help you",
        "explore and immerse",
        "yourself in web3.",
        "First, let's play a game and",
        "collect tokens for our",
        "future rewards.",
        "Are you ready?"
    ]
    const [phrases, setPhrases] = useState<string[]>([])

    useEffect(() => {
        let int: NodeJS.Timeout
        int = setInterval(() => {
            setPhrases(prev => {
                if (prev.length === 0) {
                    return [finalPhrases[0][0]]
                }
                const currentPhrase = prev.length - 1
                const currentPhraseLen = prev[currentPhrase].length
                if (currentPhraseLen < finalPhrases[currentPhrase].length) {
                    prev[currentPhrase] = prev[currentPhrase] + finalPhrases[currentPhrase][currentPhraseLen]
                    return [...prev]
                } else {
                    if (!finalPhrases[currentPhrase + 1]) {
                        clearInterval(int)
                        return prev
                    }
                    return [...prev, finalPhrases[currentPhrase + 1][0]]
                }
            })
        }, 30)

        return () => clearInterval(int)
    }, [])

    useEffect(() => {
        const to = setTimeout(() => setDisabled(false), 4_000)

        return () => clearTimeout(to)
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.illustration_wrapper}>
                <div className={styles.illustration}>
                    <CoinsIlustration className={styles.coins}/>
                    <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg_a}/>
                    <DialogueCloud/>
                    <div className={styles.text_wrapper}>
                        {
                            phrases.map((t, i) => (
                                <div key={i}>
                                    <p className={TextXSRegular.update({ color: TextColor.MainBg, weight: i === 7 ? TextWeight.Bold : undefined }).className} key={i}>
                                        {t}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg_b}/>
                    <div className={styles.frogspeak}>
                        <DotLottieReact
                            src="/animations/frogspeak.lottie"
                            autoplay
                            loop
                        />
                    </div>
                </div>
            </div>
            <Button style={ButtonStyle.Primary} fillFullWidth onClick={onNext} disabled={disabled}>
                Let's start!
            </Button>
        </div>
    )
}