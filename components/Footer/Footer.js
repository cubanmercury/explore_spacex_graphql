import { useQuery } from '@apollo/react-hooks'
import COMPANY_INFO from '../../graphql/companyInfo.query'
import Image from 'next/image'
import styles from './footer.module.scss'

const Footer = () => {
    const { data, loading, error } = useQuery(COMPANY_INFO)
    if (loading) {
        return <span>Loading...</span>
    }
    if (error) {
        return <span>Error Occured: {JSON.stringify(error)}</span>
    }
    console.log("about data: ", data)
    return (
        <div className={styles.footer}>
            <div className={styles.footercontainer}>
                <div className={styles.links}>
                    <a href={data.company.links.twitter}>
                        <Image src="/links/twitter_white_transparent.png" width="25" height="25" quality="100" />
                        <span className={styles.linkname}>Twitter</span>
                    </a>
                    <a href={data.company.links.elon_twitter}>
                        <Image src="/links/elon_icon.png" width="25" height="25" quality="100" />
                        <span className={styles.linkname}>Elon's Twitter</span>
                    </a>
                    <a href={data.company.links.website}>
                        <Image src="/links/spacex-icon.png" width="25" height="25" quality="100" />
                        <span className={styles.linkname}>SpaceX Website</span>
                    </a>
                    <a href="https://www.tesla.com/">
                        <Image src="/links/tesla.webp" width="25" height="25" quality="100" />
                        <span className={styles.linkname}>Tesla Website</span>
                    </a>
                    <a href="https://www.boringcompany.com/">
                        <Image src="/links/boring-company.png" width="25" height="25" quality="100" />
                        <span className={styles.linkname}>Boring Website</span>
                    </a>
                    <a href="https://api.spacex.land/graphql/">
                        <Image src="/graphql-icon.svg" width="25" height="25" quality="100" />
                        <span className={styles.linkname}>GraphQL IDE</span>
                    </a>
                </div>
                <div className={styles.info}>
                    <span className={styles.herotext}>
                        <span className="stackin">Exploring</span>
                        <span className="stackin"> SpaceX</span>
                        <span className="stackin"> through</span>
                        <span className="stackin"> GraphQL</span>
                    </span>
                    <div className={styles.tools}>
                        <span className={styles.tool}>
                            <Image src="/tools/next-logo.png" width="60" height="30" quality="100" />
                        </span>
                        <span className={styles.tool}>
                            <Image src="/tools/apollo.svg" width="60" height="30" quality="100" />
                        </span>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer