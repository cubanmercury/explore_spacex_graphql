import { useEffect, useState } from "react"
// import { useQuery } from "@apollo/react-hooks"
import FUTURE_LAUNCHES_QUERY from "../../graphql/futureLaunches.query"
import LaunchCard from "../LaunchCard"
import PageTitle from "../PageTitle"
import styles from "./futurelaunches.module.scss"
import { gsap } from "gsap"
import Error from "../Error"

export const UpcomingLaunches = ({ launches }) => {
  const [opened, setOpened] = useState({})
  const RenderedCards = []
  useEffect(() => {
    let tl = gsap.timeline()
    tl.fromTo(
      ".stackin",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
    )
  }, [])

  const RenderCards = ({ launches }) => {
    return (
      <ul className={styles.launchList}>
        {launches?.launchesUpcoming.map((launch) => {
          if (RenderedCards.includes(launch.id)) {
            return <></>
          } else {
            RenderedCards.push(launch.id)
            return (
              <>
                {RenderedCards.includes(launch.id) && (
                  <LaunchCard
                    key={launch.id}
                    launch={launch}
                    opened={opened}
                    setOpened={(bool) => setOpened(bool)}
                  />
                )}
              </>
            )
          }
        })}
      </ul>
    )
  }

  return (
    <div className={styles.futurelaunches}>
      <PageTitle title="Upcoming Launches" />
      <RenderCards launches={launches} />
    </div>
  )
}
