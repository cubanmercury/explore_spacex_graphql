import styles from "./droneShip.module.scss"
import PageTitle from "../PageTitle"
import Dropdown from "../Dropdown"
import Image from "next/image"

export const DroneShip = ({ ship }) => {
  const successRate =
    (ship?.successful_landings / ship?.attempted_landings) * 100

  let activeBadge
  if (ship?.active === true) {
    activeBadge = (
      <span className={styles.activebadge}>
        <Image src="/tick.svg" width="50" height="50" />
        <span>Active</span>
      </span>
    )
  }
  let landingRate
  if (ship?.successful_landings && ship?.attempted_landings) {
    landingRate = (
      <>
        <div className={styles.bite}>
          <span className={styles.bitetitle}>Attempted Landings</span>
          <span className={styles.bitecontent}>{ship.attempted_landings}</span>
        </div>
        <div className={styles.bite}>
          <span className={styles.bitetitle}>Successful Landings</span>
          <span className={styles.bitecontent}>{ship.successful_landings}</span>
        </div>
        <div className={styles.bite}>
          <span className={styles.bitetitle}>Success Rate</span>
          <span className={styles.bitecontent}>{successRate}%</span>
        </div>
      </>
    )
  }

  return (
    <div className={styles.droneship}>
      <div className={styles.title}>
        <PageTitle title={ship.name} />
        {activeBadge}
      </div>
      <div className={styles.content}>
        <div className={styles.imagecontainer}>
          <img src={ship.image} className={styles.image} />
        </div>
        <div className={styles.info}>
          <div className={`${styles.left} ${styles.block}`}>
            <div className={styles.bites}>
              <div className={styles.bite}>
                <span className={styles.bitetitle}>Name</span>
                <span className={styles.bitecontent}>{ship.name}</span>
              </div>
              <div className={styles.bite}>
                <span className={styles.bitetitle}>Model</span>
                <span className={styles.bitecontent}>{ship.model}</span>
              </div>
              <div className={styles.bite}>
                <span className={styles.bitetitle}>Home Port</span>
                <span className={styles.bitecontent}>{ship.home_port}</span>
              </div>
              <div className={styles.bite}>
                <span className={styles.bitetitle}>Year Built</span>
                <span className={styles.bitecontent}>{ship.year_built}</span>
              </div>
              {landingRate}
              <div className={styles.bite}>
                <span className={styles.bitetitle}>Roles</span>
                <ul className={styles.bitecontent}>
                  {ship.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.right} ${styles.block}`}>
            <div className={styles.missions}>
              <Dropdown title="Missions" items={ship?.missions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
