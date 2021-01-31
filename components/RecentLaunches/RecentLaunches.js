import { useQuery } from "@apollo/react-hooks"
import LAUNCHES_QUERY from "../../graphql/recentLaunches.query"
import LaunchCard from "../LaunchCard/LaunchCard"
import PageTitle from "../PageTitle"
import styles from "./recentlaunches.module.scss"
import { gsap } from "gsap"
import { useEffect, useState } from "react"

const Launches = () => {
  const [opened, setOpened] = useState({})
  const [loadedCards, setLoadedCards] = useState(false)
  useEffect(() => {
    console.log("stacking in cards: ", loadedCards)
    if (loadedCards) {
      let tl = gsap.timeline();
      tl.fromTo(
        ".stackin",
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.2}
      );
    }
  }, [loadedCards])

  const { data, loading, error } = useQuery(LAUNCHES_QUERY);

  if (loading) {
    return (
      <div>
        <p className={styles.launchListTitle}>Recent launches</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p className={styles.launchListTitle}>Recent launches</p>
        <p>Error: {JSON.stringify(error)}</p>
      </div>
    );
  }
  if (data) {
    !loadedCards ? 
      setLoadedCards(true) : 
      console.log("recent launch data: ", data, loadedCards)
  }

  const RenderCards = ({data, loadedCards}) => {
    console.log("RenderCards: ", loadedCards)
    if (loadedCards) {
      return (
        <ul className={styles.launchList}>
          {data.launchesPast.map((launch) => {
            return (
              <LaunchCard key={launch.id} launch={launch} opened={opened} setOpened={bool => setOpened(bool)} />
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
      <PageTitle title="Recent Launches" />
      <RenderCards data={data} loadedCards={loadedCards} />
    </div>
  );
};

export default Launches;