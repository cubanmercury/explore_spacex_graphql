import { useEffect, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import FUTURE_LAUNCHES_QUERY from "../../graphql/futureLaunches.query"
import LaunchCard from "../LaunchCard"
import PageTitle from "../PageTitle"
import styles from "./futurelaunches.module.scss"
import { gsap } from "gsap"
import Error from '../Error'

export const UpcomingLaunches = () => {
  const [opened, setOpened] = useState({})
  const [loadedCards, setLoadedCards] = useState(false)
  useEffect(() => {
    if (loadedCards) {
      let tl = gsap.timeline()
      tl.fromTo(
        ".stackin",
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
      )
    }
  }, [loadedCards])

  const { data, loading, error } = useQuery(FUTURE_LAUNCHES_QUERY)
  if (data) console.log("futureLaunchesData: ", data)

  if (loading) {
    return (
      <div>
        <PageTitle title="Upcoming Launches" />
      </div>
    )
  }
  if (error) {
    console.log("useQuery error in FUTURE_LAUNCHES_QUERY")
    return (
      <div>
        <PageTitle title="Upcoming Launches" />
        <Error message={JSON.stringify(error)} />
      </div>
    )
  }
  if (data) {
    !loadedCards
      ? setLoadedCards(true)
      : console.log("recent launch data: ", data, loadedCards)
  }

  const RenderCards = ({ data, loadedCards }) => {
    console.log("RenderCards: ", loadedCards)
    if (loadedCards) {
      return (
        <ul className={styles.launchList}>
          {data.launchesUpcoming.map((launch) => {
            return (
              <LaunchCard
                key={launch.id}
                launch={launch}
                opened={opened}
                setOpened={(bool) => setOpened(bool)}
              />
            )
          })}
        </ul>
      )
    } else {
      return
    }
  }

  return (
    <div>
      <PageTitle title="Upcoming Launches" />
      <RenderCards data={data} loadedCards={loadedCards} />
    </div>
  )
}
