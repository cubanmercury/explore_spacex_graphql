import { useQuery } from '@apollo/react-hooks';
import LAUNCHES_QUERY from '../../graphql/recentLaunches.query';
import LaunchCard from '../LaunchCard/LaunchCard';
import styles from './recentlaunches.module.scss';
import { gsap } from "gsap";
import { useEffect } from 'react';

const Launches = () => {

    useEffect(() => {
        let tl = gsap.timeline();
        tl.fromTo(".stackin", {opacity: 0, x: -25}, {opacity: 1, x: 0, duration: 0.5, stagger: 0.2});
    });

    const { data, loading, error } = useQuery(LAUNCHES_QUERY);

    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {JSON.stringify(error)}</p>;
    }

    return (
        <div>
            <p className={styles.launchListTitle}>Recent launches</p>
            <ul className={styles.launchList}>
                {data.launchesPast.map(launch => {
                    return (
                        <li key={launch.id} className={styles.launchCard + ` stackin`}>
                            <LaunchCard launch={launch} />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Launches;