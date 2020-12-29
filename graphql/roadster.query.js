import gql from 'graphql-tag'

const ROADSTER = gql`
    query roadster {
        roadster {
            details
            name
            launch_date_utc
            launch_mass_kg
            longitude
            inclination
            mars_distance_km
            period_days
            speed_kph
            speed_mph
            wikipedia
            earth_distance_km
            mars_distance_mi
            earth_distance_mi
            launch_mass_lbs
        }
    }

`

export default ROADSTER