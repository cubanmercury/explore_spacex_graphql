import React from 'react';
import App from '../components/App';
import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from '../lib/apolloClient'

import '../styles/globals.css'

function MyApp({ Component, pageProps, apollo }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <App>
        <Component {...pageProps} />
      </App>
    </ApolloProvider>
  )
}

export default MyApp;
