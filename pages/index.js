import styles from '../styles/Home.module.css';
import apollo  from '../lib/apolloClient'
import HomePage from '../components/Home/Home';
import LAUNCHES_QUERY from '../graphql/recentLaunches.query';
import FUTURE_LAUNCHES_QUERY from '../graphql/futureLaunches.query';
 
export default function Home() {
  return (
    <HomePage />
  )
}

export const getStaticProps = async () => {

  // await apollo().query({
  //   query: LAUNCHES_QUERY,
  // });

  // await apollo().query({
  //   query: FUTURE_LAUNCHES_QUERY
  // });

  return {
    props: {
      initialApolloState: apollo().cache.extract(),
    },
    revalidate: 1,
  }
}