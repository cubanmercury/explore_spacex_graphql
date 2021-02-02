import React, { useEffect } from "react"
import styles from "./App.module.scss"
import Head from "next/head"

import Header from "../Header"
import Footer from "../Footer"

export const App = ({ children }) => {
  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </React.Fragment>
  )
}
