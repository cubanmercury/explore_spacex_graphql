import { useQuery } from '@apollo/react-hooks';
import FUTURE_LAUNCHES_QUERY from '../../graphql/futureLaunches.query';
import LaunchCard from '../LaunchCard/LaunchCard';
import styles from './futurelaunches.module.scss';

const UpcomingLaunches = () => {
    const { data, loading, error } = useQuery(FUTURE_LAUNCHES_QUERY);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error: ", error);
        return <p>Error: {JSON.stringify(error)}</p>
    }
    console.log("futureLaunchesData: ", data);
    
    return (
        <div>
            <p className={styles.launchListTitle}>Upcoming launches</p>
            <ul className={styles.launchList}>
                {data.launchesUpcoming.map(launch => {
                    return (
                        <li key={launch.id} className={styles.launchCard}>
                            <LaunchCard launch={launch} />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default UpcomingLaunches;