import Head from 'next/head';
import DroneShips from '../components/DroneShips'

const DroneShipsPage = () => {
    return (
        <div>
            <Head>
                <title>Drone Ships</title>
            </Head>
            <DroneShips />
        </div>
    )
}

export default DroneShipsPage;