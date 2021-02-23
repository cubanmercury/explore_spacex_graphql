import { useRouter } from "next/router"
import apollo from "../../lib/apolloClient"
import MISSIONS_QUERY from "../../graphql/missions.query"
import Mission from "../../components/Mission"

const MissionDetails = (props) => {
  const router = useRouter()
  const { mid } = router.query
  let gotInfo = true
  const missionsArray = props.data?.missions
  let mission = missionsArray.find((el) => el.name === mid)
  if (mission === undefined) {
    mission = {"name": mid}
    gotInfo = false
  }

  return <Mission mission={mission} gotInfo={gotInfo} />
}

export async function getServerSideProps() {
  const { data } = await apollo().query({
    query: MISSIONS_QUERY,
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

export default MissionDetails
