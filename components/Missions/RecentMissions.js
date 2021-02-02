import { useQuery } from "@apollo/react-hooks"
import MISSIONS_QUERY from "../../graphql/missions.query"
import styles from "./missions.module.scss"
import PageTitle from "../PageTitle"
import Link from "next/link"
import { gsap } from "gsap"
import { useEffect } from "react"
import Error from "../Error"
import { useRouter } from "next/router"

export const RecentMissions = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(MISSIONS_QUERY)

  useEffect(() => {
    let tl = gsap.timeline()
    tl.fromTo(
      ".stackin",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
    )
  })

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <Error message={JSON.stringify(error)} />
  }
  if (data) {
    console.log("mission data: ", data)
  }

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
      <ul className={styles.missionslist}>
        {data.missions.map((mission) => {
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
