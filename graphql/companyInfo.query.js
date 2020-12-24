import gql from 'graphql-tag'

const COMPANY_INFO = gql`
    query companyInfo {
        company {
            ceo
            coo
            cto
            cto_propulsion
            employees
            founder
            founded
            headquarters {
                city
                state
                address
            }
            links {
                elon_twitter
                website
                twitter
            }
            name
            summary
            test_sites
            valuation
            vehicles
        }
    }
`

export default COMPANY_INFO