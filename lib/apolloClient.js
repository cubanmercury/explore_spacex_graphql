import { useMemo } from 'react'
import { ApolloClient, HttpLink } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';

let apolloClient

function createApolloClient() {
  const spacexLink = new HttpLink({
    uri: new URL('/graphql', process.env.NEXT_PUBLIC_SPACE_X_URL),
    credentials: 'same-origin'
  });
  
  return new ApolloClient({
    ssrMode: !process.browser,
    link: spacexLink,
    cache: new InMemoryCache(),
  })
}


// export function initializeApollo(initialState = null) {
//     const _apolloClient = apolloClient ?? createApolloClient()
  
//     // If your page has Next.js data fetching methods that use Apollo Client, the initial state
//     // gets hydrated here
//     if (initialState) {
//       // Get existing cache, loaded during client side data fetching
//       const existingCache = _apolloClient.extract()
//       // Restore the cache using the data passed from getStaticProps/getServerSideProps
//       // combined with the existing cached data
//       _apolloClient.cache.restore({ ...existingCache, ...initialState })
//     }
//     // For SSG and SSR always create a new Apollo Client
//     if (typeof window === 'undefined') return _apolloClient
//     // Create the Apollo Client once in the client
//     if (!apolloClient) apolloClient = _apolloClient
  
//     return _apolloClient
// }


export default function apollo(initialState = null) {
  // Create new client if not already created
  const _apolloClient = apolloClient ?? createApolloClient()

  // If page fetches data using Apollo Client, hydrate initial state
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState
    })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Store reference of the created apollo client to make sure it's only created once
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}



export function useApollo(initialState) {
    const store = useMemo(() => apollo(initialState), [initialState])
    return store
  }