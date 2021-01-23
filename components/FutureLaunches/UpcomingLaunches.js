import { useEffect, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import FUTURE_LAUNCHES_QUERY from '../../graphql/futureLaunches.query';
import LaunchCard from '../LaunchCard/LaunchCard';
import styles from './futurelaunches.module.scss';
import { gsap } from "gsap";

const UpcomingLaunches = () => {
    const [opened, setOpened] = useState({})
    useEffect(() => {
      let tl = gsap.timeline();
      tl.fromTo(
        ".stackin",
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
      );
    }, []);

    
    const { data, loading, error } = useQuery(FUTURE_LAUNCHES_QUERY);
    if (data) console.log("futureLaunchesData: ", data);

    if (loading) {
        return (
          <div>
            <p className={styles.launchListTitle}>Recent launches</p>
            {/* <p>Loading...</p> */}
          </div>
        );
      }

      if (error) {
          console.log("useQuery error in FUTURE_LAUNCHES_QUERY")
        return (
          <div>
            <p className={styles.launchListTitle}>Recent launches</p>
            <p>Error: {JSON.stringify(error)}</p>
          </div>
        );
      }
    
    return (
        <div>
            <p className={styles.launchListTitle}>Upcoming launches</p>
            <ul className={styles.launchList}>
                {data.launchesUpcoming.map(launch => {
                    return (
                        <LaunchCard key={launch.id} launch={launch} opened={opened} setOpened={bool => setOpened(bool)} />
                    );
                })}
            </ul>
        </div>
    )
}

export default UpcomingLaunches;