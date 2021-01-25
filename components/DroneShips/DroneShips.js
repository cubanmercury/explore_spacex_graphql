import { useQuery } from "@apollo/react-hooks";
import DRONE_SHIPS_QUERY from "../../graphql/droneShips.query";
import LaunchCard from "../LaunchCard/LaunchCard";
import styles from "./droneShips.module.scss";
import { gsap } from "gsap";
import { useEffect, useState } from "react";

export const DroneShips = () => {
  const [opened, setOpened] = useState({})
  useEffect(() => {
    let tl = gsap.timeline();
    tl.fromTo(
      ".stackin",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
    );
  }, []);


  const { data, loading, error } = useQuery(DRONE_SHIPS_QUERY);
  if (data) console.log("DroneShips data: ", data)

  if (loading) {
    return (
      <div>
        <p className={styles.launchListTitle}>Drone Ships</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className={styles.launchListTitle}>Drone Ships</p>
        <p>Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <div>
      <p className={styles.launchListTitle}>Drone Ships</p>
      {/* <ul className={styles.launchList}>
        {data.launchesPast.map((launch) => {
          return (
            <LaunchCard key={launch.id} launch={launch} opened={opened} setOpened={bool => setOpened(bool)} />
          );
        })}
      </ul> */}
    </div>
  );
};
