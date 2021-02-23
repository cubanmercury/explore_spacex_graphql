import Head from "next/head"
import DroneShips from "../components/DroneShips"
import DRONE_SHIPS_QUERY from "../graphql/droneShips.query"
import apollo from "../lib/apolloClient"

const DroneShipsPage = (props) => {
  return (
    <div>
      <Head>
        <title>Drone Ships</title>
      </Head>
      <DroneShips droneData={props.data.shipsResult} />
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await apollo().query({
    query: DRONE_SHIPS_QUERY,
  })

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    },
  }
}

export default DroneShipsPage
