import Head from "next/head"
import RecentLaunches from "../components/RecentLaunches"
import apollo from "../lib/apolloClient"
import LAUNCHES_QUERY from "../graphql/recentLaunches.query"

const FutureLaunches = (props) => {
  return (
    <div>
      <Head>
        <title>Recent Launches</title>
      </Head>
      <RecentLaunches launchData={props?.data} />
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await apollo().query({
    query: LAUNCHES_QUERY
  })

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    revalidate: 60,
    props: {
      data
    }
  }
}
export default FutureLaunches
