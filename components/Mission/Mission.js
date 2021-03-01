import styles from "./mission.module.scss"
import PageTitle from "../PageTitle"
import Error from "../Error"
import Image from "next/image"
import { useRouter } from "next/router"

export const Mission = ({ mission, gotInfo }) => {
  console.log("missions: ", mission)
  const Router = useRouter()

  const handleLink = (e, link) => {
    Router.push(link)
  }

  if (!gotInfo) {
    return (
      <>
        <PageTitle title={mission.name} />
        <Error message="No data found for this mission!" />
      </>
    )
  } else {
    return (
      <div className={styles.container}>
        <PageTitle title={mission.name} />
        <div className={styles.missioncontent}>
          <div className={styles.description}>
            <p>{mission.description}</p>
          </div>

          <div className={styles.linkscontainer}>
            <div className={styles.exploretitle}>
              <p>Keep Exploring...</p>
            </div>
            <div className={styles.linkscontent}>
              <div className={styles.links} onClick={(e) => handleLink(e, mission.wikipedia)}>
                <div className={styles.linkicon}>
                  <Image
                    src="/links/wikipedia-logo.svg"
                    width="75"
                    height="75"
                  />
                </div>
                <div className={styles.link}>Wikipedia</div>
              </div>

              <div className={styles.links} onClick={(e) => handleLink(e, mission.twitter)}>
                <div className={styles.linkicon}>
                  <Image
                    src="/links/twitter_white_transparent.png"
                    width="75"
                    height="75"
                  />
                </div>
                <div className={styles.link}>Twitter</div>
              </div>

              <div className={styles.links} onClick={(e) => handleLink(e, mission.website)}>
                <div className={styles.linkicon}>
                  <Image src="/links/website.png" width="75" height="75" />
                </div>
                <div className={styles.link}>Website</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
