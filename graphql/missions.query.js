import gql from 'graphql-tag';

const MISSIONS_QUERY = gql`
query missions {
  missions(limit: 10) {
    description
    id
    manufacturers
    name
    website
  }
}
`

export default MISSIONS_QUERY;