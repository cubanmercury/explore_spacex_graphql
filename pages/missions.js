import Head from 'next/head';
import RecentMissions from '../components/Missions/RecentMissions';

const missions = () => {
    return (
        <div>
            <Head>
                <title>Missions</title>
            </Head>
            <RecentMissions />
        </div>
    )
}

export default missions;