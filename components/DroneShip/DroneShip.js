import styles from "./droneShip.module.scss"
import PageTitle from "../PageTitle"
import Dropdown from "../Dropdown"

export const DroneShip = ({ ship }) => {
  console.log("DroneShip component: ", ship)

  const successRate = (ship?.successful_landings / ship?.attempted_landings) * 100

  let activeBadge
  if (ship?.active === true) {
    activeBadge = <span className={styles.activebadge}>Active</span>
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
              <span>Model: {ship.model}</span>
              <span>Home Port: {ship.home_port}</span>
              <span>Year Built: {ship.year_built}</span>
              <span>Attempted Landings: {ship.attempted_landings}</span>
              <span>Successful Landings: {ship.successful_landings}</span>
              <span>SuccessRate: {successRate}%</span>
              <span>
                Roles:
                <ul>
                  {ship.roles.map((role) =>
                    <li key={role}>{role}</li>
                  )}
                </ul>
              </span>
            </div>
          </div>
          <div className={`${styles.right} ${styles.block}`}>
            <div className={styles.missions}>

              <Dropdown title="Missions" items={ship?.missions} />

              {/* <div className={styles.missionstitle}>Missions</div>
              <div className={styles.missionsdropdown}>
                <ul className={styles.missionslist}>
                  {ship?.missions.map((mission) => 
                    <li key={mission.name}>
                      {mission.name}
                    </li>
                  )}
                </ul>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
