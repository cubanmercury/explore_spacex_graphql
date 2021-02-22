import { useQuery } from "@apollo/react-hooks"
import LAUNCHES_QUERY from "../../graphql/recentLaunches.query"
import LaunchCard from "../LaunchCard"
import PageTitle from "../PageTitle"
import styles from "./recentlaunches.module.scss"
import { gsap } from "gsap"
import { useEffect, useState } from "react"

export const Launches = ({launchData}) => {
  console.log("props: ", launchData)
  const [opened, setOpened] = useState({})
  const [loadedCards, setLoadedCards] = useState(false)
  useEffect(() => {
    // console.log("stacking in cards: ", loadedCards)
    if (loadedCards) {
      let tl = gsap.timeline()
      tl.fromTo(
        ".stackin",
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
      )
    }
  }, [loadedCards])

  if (launchData?.launchesPast) {
    !loadedCards
      ? setLoadedCards(true)
      : console.log("recent launch data: ", launchData, loadedCards)
  }

  const RenderCards = ({ data, loadedCards }) => {
    if (loadedCards) {
      return (
        <ul className={styles.launchList}>
          {data.map((launch) => {
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
      return (
        <span>No data found</span>
      )
    }
  }

  return (
    <div className={styles.recentlaunches}>
      <PageTitle title="Recent Launches" />
      <RenderCards data={launchData.launchesPast} loadedCards={loadedCards} />
    </div>
  )
}
