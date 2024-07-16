import { Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Lottie from 'react-lottie';
import animationData from './frogspeak.json';
import { CoinsIlustration, DialogueCloud } from "@assets";
import { TextColor, TextWeight, TextXSRegular } from "@utils";

type Props = {
    onNext?: () => any
}

export const Hello: FC<Props> = ({ onNext }) => {

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        const to = setTimeout(() => setDisabled(false), 13_000)

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
                            [
                                "Hi, I'm Le.",
                                "And I'm going to help you",
                                "explore and immerse",
                                "yourself in web3.",
                                "First, let's play a game and",
                                "collect tokens for our",
                                "future rewards."
                            ].map((t, i) => (
                                <div key={i}>
                                    <p className={TextXSRegular.update({ color: TextColor.MainBg }).className} key={i}>
                                        {t}
                                    </p>
                                </div>
                            ))
                        }
                        <div>
                            <p className={TextXSRegular.update({ color: TextColor.MainBg, weight: TextWeight.Bold }).className}>
                                Are you ready?
                            </p>
                        </div>
                    </div>
                    <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg_b}/>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData
                        }}
                        isClickToPauseDisabled
                        width={160}
                        height={160}
                    />
                </div>
            </div>
            <Button style={ButtonStyle.Primary} fillFullWidth onClick={onNext} disabled={disabled}>
                Let's start!
            </Button>
        </div>
    )
}