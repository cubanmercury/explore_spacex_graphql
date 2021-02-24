import Head from "next/head"
import UpcomingLaunches from "../components/FutureLaunches"
import FUTURE_LAUNCHES_QUERY from "../graphql/futureLaunches.query"
import apollo from "../lib/apolloClient"

const FutureLaunches = (props) => {
  return (
    <div>
      <Head>
        <title>Future Launches</title>
      </Head>
      <UpcomingLaunches launches={props.data} />
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await apollo().query({
    query: FUTURE_LAUNCHES_QUERY,
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

export default FutureLaunches
