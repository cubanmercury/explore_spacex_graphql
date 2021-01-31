import { useQuery } from '@apollo/react-hooks';
import MISSIONS_QUERY from '../../graphql/missions.query';
import styles from './missions.module.scss';
import PageTitle from "../PageTitle"

const RecentMissions = () => {
    const { data, loading, error } = useQuery(MISSIONS_QUERY);

    if(loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }
    if (data) {
        console.log("mission data: ", data);
    }

    return (
        <div>
            <PageTitle title="Recent Missions" />
            <ul className={styles.launchList}>
                {data.missions.map(mission => {
                    return (
                        <li key={mission.id} className={styles.missioncard + ` stackin`}>
                            {mission.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default RecentMissions;