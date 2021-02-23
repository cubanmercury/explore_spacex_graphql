import { useRouter } from "next/router"
import apollo from "../../lib/apolloClient"
import DRONE_SHIPS_QUERY from "../../graphql/droneShips.query"
import DroneShip from "../../components/DroneShip"

const DroneShipDetails = (props) => {
  const router = useRouter()
  const { did } = router.query

  const shipsArray = props.data?.shipsResult.data
  const ship = shipsArray.find(el => el.id === did)

  return (
    <DroneShip ship={ship} />
  )
}

export async function getServerSideProps() {
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

export default DroneShipDetails
