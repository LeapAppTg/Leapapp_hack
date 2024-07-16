import { SquaresPattern } from "@assets";
import { Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { FrogIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { FlexGapColumn, FlexGapColumn8, FlexGapColumn8FullWidth, FlexGapRow12FullWidth, FlexGapRow8, TextColor, TextSRegular, TextXLMedium, TextXSRegular, TextXXLMedium, TextXXXLBold } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

export const StreakPage: FC = () => {
    return (
        <div className={styles.wrapper}>

            <img className={styles.confetti_bg} src="/other/confetti.png"/>

            <div className={styles.content_wrapper}>
                <div className={styles.content}>

                    <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.background}/>

                    <TelegramEmoji size={TelegramEmojiSize.XXLarge} type={TelegramEmojiType.Rocket}/>

                    <div className={FlexGapColumn8.className}>
                        <div className={FlexGapColumn.className}>
                            <h1 className={TextXXXLBold.className}>
                                2
                            </h1>
                            <h3 className={TextXXLMedium.className}>
                                days in a row
                            </h3>
                        </div>
                        <p className={TextXSRegular.className}>
                            Waiting for you tomorrow,<br/>
                            preparing a gift for you.
                        </p>
                    </div>


                    <div className={FlexGapRow12FullWidth.className}>
                        <div className={FlexGapColumn8FullWidth.className}>
                            <p className={TextSRegular.update({ color: TextColor.Grey400 }).className}>
                                Bonus points
                            </p>
                            <div className={FlexGapRow8.className}>
                                <IconBox size={IconSize.Large} icon={PointsIcon}/>
                                <p className={TextXLMedium.className}>20</p>
                            </div>
                        </div>
                        <div className={FlexGapColumn8FullWidth.className}>
                            <p className={TextSRegular.update({ color: TextColor.Grey400 }).className}>
                                Games
                            </p>
                            <div className={FlexGapRow8.className}>
                                <IconBox size={IconSize.Large} icon={FrogIcon}/>
                                <p className={TextXLMedium.className}>2</p>
                            </div>
                        </div>
                    </div>

                    <SquaresPattern/>

                </div>
            </div>

            <Button style={ButtonStyle.Primary} fillFullWidth linkTo="/home">
                Take and continue
            </Button>
        </div>
    )
}