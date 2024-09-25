import { Button, ButtonStyle, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ArrowIcon } from "@icons";
import { FlexGapColumn12FullWidthFullHeight } from "@utils";
import { FC } from "react";
import { Balance, GamePreview } from "./components";

export const HomePage: FC = () => {
    return (
        <>
        <Balance/>
        <div className={FlexGapColumn12FullWidthFullHeight.className}>
            <Button style={ButtonStyle.Link} rightIcon={ArrowIcon} linkTo="/leaderboard">
                <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Cup}/>
                Game Leaderboard
            </Button>
            <GamePreview/>
        </div>
        </>
    )
}