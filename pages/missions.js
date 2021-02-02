import Head from 'next/head';
import RecentMissions from '../components/Missions';

const Missions = () => {
    return (
        <div>
            <Head>
                <title>Missions</title>
            </Head>
            <RecentMissions />
        </div>
    )
}

export default Missions;