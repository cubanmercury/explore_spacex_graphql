import gql from 'graphql-tag'

const FUTURE_LAUNCHES_QUERY = gql`
  query futureLaunches {
    launchesUpcoming(limit: 10) {
      id
      details
      launch_date_utc
      launch_site {
        site_id
        site_name_long
      }
      links {
        mission_patch
      }
      mission_id
      mission_name
      rocket {
        rocket_name
      }
    }
  }
`;

export default FUTURE_LAUNCHES_QUERY