import gql from 'graphql-tag';

const MISSIONS_QUERY = gql`
query missions {
  missions(limit: 20) {
    description
    id
    manufacturers
    name
    website
    wikipedia
    twitter
  }
}
`

export default MISSIONS_QUERY;