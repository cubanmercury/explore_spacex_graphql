import gql from "graphql-tag"

const DRONE_SHIPS_QUERY = gql`
  query droneShips {
    shipsResult(limit: 100, sort: "attempted_landings") {
      result {
        totalCount
      }
      data {
        id
        name
        active
        image
        url
        year_built
        attempted_landings
        successful_landings
        status
        model
        home_port
        roles
        missions {
          name
        }
      }
    }
  }
`

export default DRONE_SHIPS_QUERY
