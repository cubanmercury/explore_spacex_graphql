import gql from 'graphql-tag';

const MISSIONS_QUERY = gql`
query missions {
  missions(limit: 100) {
    description
    id
    manufacturers
    name
    website
  }
}
`

export default MISSIONS_QUERY;