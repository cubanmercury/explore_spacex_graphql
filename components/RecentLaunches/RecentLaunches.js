import { useQuery } from "@apollo/react-hooks";
import LAUNCHES_QUERY from "../../graphql/recentLaunches.query";
import LaunchCard from "../LaunchCard/LaunchCard";
import styles from "./recentlaunches.module.scss";
import { gsap } from "gsap";
import { useEffect, useState } from "react";

const Launches = () => {
  const [opened, setOpened] = useState({})
  useEffect(() => {
    let tl = gsap.timeline();
    tl.fromTo(
      ".stackin",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
    );
  }, []);


  const { data, loading, error } = useQuery(LAUNCHES_QUERY);
  if (data) console.log("recent launch data: ", data)

  if (loading) {
    return (
      <div>
        <p className={styles.launchListTitle}>Recent launches</p>
        {/* <p>Loading...</p> */}
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

  return (
    <div>
      <p className={styles.launchListTitle}>Recent launches</p>
      <ul className={styles.launchList}>
        {data.launchesPast.map((launch) => {
          return (
            <LaunchCard key={launch.id} launch={launch} opened={opened} setOpened={bool => setOpened(bool)} />
          );
        })}
      </ul>
    </div>
  );
};

export default Launches;