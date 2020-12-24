import styles from "./roadster.module.scss";
import Image from "next/image";

const Roadster = () => {
    const video = "/dynamic/nebula.mp4";

    return (
        <div id="roadsterbanner" className={styles.roadsterbanner}>
            <video className='videoTag' autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
            <div className={styles.roadster}>
                <Image src="/roadsterTransparentBackground.png" width="400" height="142" quality="100" />
            </div>
            <span className={styles.roadstertitle}>
                Where is Elon's Roadster

                <span className={styles.buttoncont}>
                    <button className={styles.button}>
                        <span>Find Out</span>
                    </button>
                </span>
            </span>

        </div>
    )
}

export default Roadster;