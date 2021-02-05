import gql from "graphql-tag"

const ROCKETS_CAPSULES_QUERY = gql`
  query rockets {
    rocketsResult(limit: 100) {
      data {
        id
        name
        success_rate_pct
        type
        active
        description
        first_flight
        mass {
          kg
          lb
        }
        height {
          feet
          meters
        }
        cost_per_launch
        engines {
          number
          type
          version
          layout
          engine_loss_max
          propellant_1
          propellant_2
          thrust_to_weight
          thrust_vacuum {
            kN
            lbf
          }
        }
        payload_weights {
          name
          kg
        }
      }
      result {
        totalCount
      }
    }
  }
`

export default ROCKETS_CAPSULES_QUERY
