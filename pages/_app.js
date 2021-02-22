import React from "react"
import App from "../components/App"
import { ApolloProvider } from "@apollo/react-hooks"
import { useApollo } from "../lib/apolloClient"
import { MediaContextProvider } from "../lib/media"

import "../styles/globals.css"

function MyApp({ Component, pageProps, apollo }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <MediaContextProvider>
        <App>
          <Component {...pageProps} />
        </App>
      </MediaContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
