import Head from "next/head"
import Rockets from "../components/Rockets"
import ROCKETS_CAPSULES_QUERY from "../graphql/rocketsCapsules.query"
import apollo from "../lib/apolloClient"

const RocketsCapsules = (props) => {
  return (
    <div>
      <Head>
        <title>Rockets &amp; Capsules</title>
      </Head>
      <Rockets rocketsResult={props?.data.rocketsResult} />
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await apollo().query({
    query: ROCKETS_CAPSULES_QUERY,
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

export default RocketsCapsules
