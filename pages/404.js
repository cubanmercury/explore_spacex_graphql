import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/error.module.scss';

const Custom404 = () => {
    return (
        <div className={styles.notfound}>
            <Head>
                <title>404</title>
            </Head>
            <h1>404  |  Page Not Found</h1>
            <div className="trav">
                <Image src="/confusedTravolta.gif" width="1000" height="1000" />
            </div>
        </div>
    )
}


export default Custom404;