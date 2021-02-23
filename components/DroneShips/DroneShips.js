import DroneCard from "./DroneCard/DroneCard"
import PageTitle from "../PageTitle"
import styles from "./droneShips.module.scss"
import { gsap } from "gsap"
import { useEffect, useState } from "react"

export const DroneShips = ({ droneData }) => {
  useEffect(() => {
    let tl = gsap.timeline()
    tl.fromTo(
      ".stackin",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
    )
  }, [])

  let droneDataReversed = droneData.data.slice(0).reverse()

  return (
    <div>
      <PageTitle title="Drone Ships &amp; Boats" />
      <ul className={styles.dronelist}>
        {droneDataReversed.map((drone) => {
          return <DroneCard key={drone.id} drone={drone} />
        })}
      </ul>
    </div>
  )
}
