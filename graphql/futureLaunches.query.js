import gql from 'graphql-tag'

const FUTURE_LAUNCHES_QUERY = gql`
query futureLaunches {
  launchesUpcoming(limit: 10) {
    id
    details
    launch_date_local
    launch_site {
      site_id
      site_name_long
    }
    links {
      mission_patch
      flickr_images
      article_link
      video_link
      wikipedia
    }
    mission_id
    mission_name
    rocket {
      rocket_name
    }
    ships {
      image
      name
    }
  }
}

`;

export default FUTURE_LAUNCHES_QUERY