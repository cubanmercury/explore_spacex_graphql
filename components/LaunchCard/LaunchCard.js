import styles from './launchcard.module.scss';
import Image from "next/image"
import { gsap } from "gsap";
import { useState } from "react";

const LaunchCard = ({launch, cardOpen, close}) => {
    const [modal, setModal] = useState(false)
    // console.log("launchCard: ", launch, cardOpen)

    const handleClose = e => {
        console.log("handleClose in LaunchCard")
        gsap.fromTo(e.currentTarget, {display: "flex"}, {display: "none", duration: 0.5})
        close(e)
        setModal(false)
    }

    let missionPatch;
    if (launch.links.mission_patch) {
        missionPatch = <img className={styles.patch} src={launch.links.mission_patch} width="300" height="250" />
    } else {
        missionPatch = <span className={styles.nopatch}>No Mission Patch Found</span>
    }

    if (cardOpen.opened === launch.id && modal === false) {
        setModal(true)
    }

    const CardContent = () => {
        if (modal === true) {
            return (
            <div className={styles.cardcontent}>
                <span className={styles.close} onClick={handleClose}><Image src="/cancel.svg" width="20" height="20" /></span>  
                <div className={styles.patchcontainer}>
                    {missionPatch}
                </div>
                <span>Modal</span>
                <h3 className={styles.launchNameTitle}>{launch.mission_name}</h3>   
            </div>
            )
        } else {
            return (
                <div className={styles.cardcontent}>
                    <div className={styles.patchcontainer}>
                        {missionPatch}
                    </div>
                    <h3 className={styles.launchNameTitle}>{launch.mission_name}</h3>
                </div>
            )
        }
    }

    return (
        <CardContent />
    )
}

export default LaunchCard;


