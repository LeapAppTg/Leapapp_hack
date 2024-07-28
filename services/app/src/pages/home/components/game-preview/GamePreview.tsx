import { BombCoin, DollarCoin, DotsBackground, EyeCoin, GoldCoin, HeroGood, HeroHalfOpen, HeroOpen, HeroSad, HeroSad2, UfoCoin } from "@assets";
import { Button, ButtonStyle, GameSlider, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FlexGapColumn, FlexGapColumn8, TextColor, TextLSemiBold, TextSRegular, TextXSBold, TextXXSRegular, TextXXSRegularGrey400 } from "@utils";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { ApiRoutes, useData } from "@hooks";

export const GamePreview: FC<PropsWithChildren> = () => {

    const { data: user } = useData(ApiRoutes.GetUserProfile)
    const [isPlayAvailable, record] = useMemo(() => [user ? user.gameTickets > 0 : false, user ? user.gameRecord.format() : '-'], [user])
    const [heroState, setHeroState] = useState<number>(2)

    useEffect(() => {
        const interval = setInterval(() => setHeroState(prev => prev === 5 ? 1 : prev + 1), 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Link to={isPlayAvailable ? '/game' : '/home'} className={styles.wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.overflow}>
                    <div className={FlexGapColumn.className}>
                        <p className={TextXXSRegularGrey400.className}>
                            Your record
                        </p>
                        <p className={TextXSBold.withExtraClasses(styles.record)}>
                            {record}
                        </p>
                    </div>
                    <div className={FlexGapColumn8.className}>
                        <p className={TextSRegular.className}>
                            Leap is hungry...
                        </p>
                        <p className={TextLSemiBold.className}>
                            {
                                isPlayAvailable
                                ?
                                'Click to start'
                                :
                                'Gain more tickets to play'
                            }
                        </p>
                    </div>
                    {
                        isPlayAvailable
                        ?
                        <Button style={ButtonStyle.Tertiary}>
                            Play game
                        </Button>
                        :
                        <span/>
                    }
                </div>
                <div className={styles.illustration}>
                    <DotsBackground className={styles.background}/>
                    
                    <GoldCoin className={styles.game_token}/>
                    <UfoCoin className={styles.game_token}/>
                    <EyeCoin className={styles.game_token}/>
                    <BombCoin className={styles.game_token}/>
                    <DollarCoin className={styles.game_token}/>

                    <div className={styles.hero_wrapper}>
                        {
                            heroState === 1
                            ?
                            <HeroSad className={styles.hero}/>
                            :
                            heroState === 2
                            ?
                            <HeroGood className={styles.hero}/>
                            :
                            heroState === 3
                            ?
                            <HeroHalfOpen className={styles.hero}/>
                            :
                            heroState === 4
                            ?
                            <HeroOpen className={styles.hero}/>
                            :
                            <HeroSad2 className={styles.hero}/>
                        }
                        <GameSlider/>
                    </div>
                </div>
            </div>
        </Link>
    )
}