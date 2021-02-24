import Head from "next/head"
import apollo from "../lib/apolloClient"
import RecentMissions from "../components/Missions"
import MISSIONS_QUERY from "../graphql/missions.query"

const Missions = (props) => {
  return (
    <div>
      <Head>
        <title>Missions</title>
      </Head>
      <RecentMissions missions={props?.data} />
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await apollo().query({
    query: MISSIONS_QUERY,
  })

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    revalidate: 60,
    props: {
      data,
    },
  }
}

export default Missions
