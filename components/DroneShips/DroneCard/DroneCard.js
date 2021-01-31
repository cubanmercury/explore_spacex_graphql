import styles from "./droneCard.module.scss"
import { gsap } from "gsap"
import { useRouter } from "next/router"

const DroneCard = ({ drone }) => {
  // console.log("drone in droneCard.js: ", drone);
  const router = useRouter()

  const handleMouseEnter = (e) => {
    gsap.fromTo(
      e.currentTarget,
      { y: 0, x: 0, boxShadow: "none" },
      { y: -5, x: -5, boxShadow: "4px 4px 20px 4px #a7a9ac", duration: 0.4 }
    )
  }

  const handleMouseLeave = (e) => {
    gsap.fromTo(
      e.currentTarget,
      { y: -5, x: -5, boxShadow: "4px 4px 20px 4px #a7a9ac" },
      { y: 0, x: 0, boxShadow: "none", duration: 0.4 }
    )
  }

  const handleClick = (e) => {
    const id = e.currentTarget.id
    router.push(`/drone-ships/${id}`)
  }

  const BackgroundImage = () => {
    if (drone.image) {
      return (
        <>
          <span className={styles.name}>{drone.name}</span>
          <img src={drone.image} className={styles.backgroundimage} />
        </>
      )
    } else {
      return (
        <>
          <span className={`${styles.name} ${styles.withplaceholder}`}>
            <img src="/image.svg" className={styles.placeholder} />
            {drone.name}
          </span>
        </>
      )
    }
  }

  return (
    <li
      key={drone.id}
      id={drone.id}
      className={`${styles.dronecard} stackin`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <BackgroundImage />
    </li>
  )
}

export default DroneCard
