import styles from './launchcard.module.scss';

const LaunchCard = ({launch}) => {
    let missionPatch;
    if (launch.links.mission_patch) {
        missionPatch = <img className={styles.patch} src={launch.links.mission_patch} width="300" height="250" />
    } else {
        missionPatch = <span className={styles.nopatch}>No Mission Patch Found</span>
    }
    return (
        <div className={styles.cardcontent}>
            <div className={styles.patchcontainer}>
                {missionPatch}
            </div>
            <h3 className={styles.launchNameTitle}>{launch.mission_name}</h3>
        </div>
    )
}

export default LaunchCard;


