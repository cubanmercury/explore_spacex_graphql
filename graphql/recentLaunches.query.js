import gql from 'graphql-tag'

const LAUNCHES_QUERY = gql`
query launchesPast {
    launchesPast(limit: 10) {
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        flickr_images
        mission_patch
      }
      id
      rocket {
        rocket_name
        rocket_type
        rocket {
          name
        }
      }
      mission_name
      ships {
        id
        name
      }
    }
  }
`

export default LAUNCHES_QUERY