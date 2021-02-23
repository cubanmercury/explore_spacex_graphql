import MISSIONS_QUERY from "../../graphql/missions.query"
import styles from "./missions.module.scss"
import PageTitle from "../PageTitle"
import { gsap } from "gsap"
import { useEffect } from "react"
import Error from "../Error"
import { useRouter } from "next/router"

export const RecentMissions = ({missions}) => {
  const router = useRouter()

  useEffect(() => {
    let tl = gsap.timeline()
    tl.fromTo(
      ".stackin",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
    )
  })

  const handleMouseEnter = (e) => {
    gsap.fromTo(
      e.currentTarget,
      { y: 0, x: 0, boxShadow: "none" },
      { y: -5, x: -5, boxShadow: "4px 4px 20px 4px #fff", duration: 0.4 }
    )
  }
  const handleMouseLeave = (e) => {
    gsap.fromTo(
      e.currentTarget,
      { y: -5, x: -5, boxShadow: "4px 4px 20px 4px #fff" },
      { y: 0, x: 0, boxShadow: "none", duration: 0.4 }
    )
  }
  const handleClick = (mission) => {
    router.push(`/mission/${mission.name}`)
  }

  return (
    <div className={styles.missionspage}>
      <PageTitle title="Recent Missions" />
      {!missions.missions && (
        <Error message="No Missions found!" />
      )}
      <ul className={styles.missionslist}>
        {missions?.missions.map((mission) => {
          return (
            <li
              key={mission.id}
              className={styles.missioncard + ` stackin`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(mission)}
            >
              {mission.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
