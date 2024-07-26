import { BookOpenIcon, IconBox, IconColor, IconFC, IconSize, ListTaskCheckmarkIcon, PackageBoxHomeIcon, SubstractGroupIcon, UserProfileIcon } from "@icons";
import { TextColor, TextXXXSRegularGrey400, classJoiner } from "@utils";
import { FC } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./styles.module.css";

export const Navigation: FC = () => {
    return (
        <div className={styles.navigation}>
            <CurrentLink to="/quests" icon={ListTaskCheckmarkIcon} title="Quests"/>
            <CurrentLink to="/referrals" icon={UserProfileIcon} title="Referrals"/>
            <CurrentLink to="/home" icon={PackageBoxHomeIcon} title="Home"/>
            <CurrentLink to="/market" icon={BookOpenIcon} title="Learning"/>
            <CurrentLink to="/squads" icon={SubstractGroupIcon} title="Squads"/>
        </div>
    )
}

type CurrentLinkProps = {
    icon: IconFC,
    title: string,
    to: string
}

const CurrentLink: FC<CurrentLinkProps> = ({ icon, title, to }) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: false })
    
    return (
        <Link to={to}>
            <div className={classJoiner(styles.item, (isActive ? styles.active : undefined))}>
                <IconBox icon={icon} size={IconSize.Medium} color={isActive ? IconColor.MainWhite : IconColor.Grey400}/>
                <p className={TextXXXSRegularGrey400.update({ color: isActive ? TextColor.MainWhite : undefined }).className}>
                    {title}
                </p>
            </div>
        </Link>
    )
}