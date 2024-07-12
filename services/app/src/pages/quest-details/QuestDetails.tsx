import { Button, ButtonStyle, ContentBlock, PageTitle, PageTitleBackgroundColor } from "@components";
import { IconBox, IconSize, PointsIcon } from "@icons";
import { FlexGapRow4, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";
import { Task, TaskStatus } from "./components";
import styles from "./styles.module.css";

export const QuestDetailsPage: FC = () => {

    return (
        <>
        <PageTitle color={PageTitleBackgroundColor.Yellow} title="Quests details" subtitle="Complete quest and get reward"/>
        <div className={styles.tasks}>
            <Task status={TaskStatus.Active} title="Join community" description="Complete quests and tasks and get rewards"/>
            <Task status={TaskStatus.Active} title="Join community" description="Complete quests and tasks and get rewards" link="https://t.me/"/>
            <Task status={TaskStatus.Completed} title="Join community" description="Complete quests and tasks and get rewards"/>
            <Task status={TaskStatus.TimeLocked} title="Join community" description="Complete quests and tasks and get rewards"/>
            <Task status={TaskStatus.TimeLocked} title="Get reward" reward={100}/>
            <Task status={TaskStatus.Active} title="Get reward" reward={100}/>
        </div>
        <ContentBlock>
            <p className={TextXSRegularGrey400.className}>Complete the quests to get reward</p>
            <Button style={ButtonStyle.Primary} fillFullWidth>
                Get reward
                <span className={FlexGapRow4.className}>
                    <IconBox icon={PointsIcon} size={IconSize.Medium}/>
                    <p className={TextXSRegular.className}>{Number(100).format("default", 2)}</p>
                </span>
            </Button>
        </ContentBlock>
        </>
    )
}