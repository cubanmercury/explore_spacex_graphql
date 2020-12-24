import styles from "./about.module.scss";
import Image from "next/image";
import { useQuery } from '@apollo/react-hooks';
import COMPANY_INFO from '../../../graphql/companyInfo.query'

const About = () => {
    const { data, loading, error } = useQuery(COMPANY_INFO)
    if (loading) {
        return <span>Loading...</span>
    }
    if (error) {
        return <span>Error Occured: {JSON.stringify(error)}</span>
    }
    console.log("about data: ", data)

    return (
        <div className={styles.aboutcontainer}>
            <span className={styles.summary}>{data.company.summary}</span>
            <div className={styles.people}>
                <div className={styles.personcard}>
                    <Image src="/people/elonmusk.jpg" width="80" height="250" quality="100" objectFit="contain" />
                    <span className={styles.title}>
                        <span>CEO, CTO, Founder:</span>
                        <span>{data.company.ceo}</span>
                    </span>
                </div>
                <div className={styles.personcard}>
                    <Image src="/people/GwynneShotwellHeadshot.jpg" width="80" height="250" quality="100" objectFit="contain" />
                    <span className={styles.title}>
                        <span>COO:</span>
                        <span>{data.company.coo}</span>
                    </span>
                </div>
                <div className={styles.personcard}>
                    <Image src="/people/tommueller.jpg" width="80" height="250" quality="100" objectFit="contain" />
                    <span className={styles.title}>
                        <span>CTO of Propulsion:</span>
                        <span>{data.company.cto_propulsion}</span>
                    </span>
                </div>
                <div className={styles.personcard}>
                    <Image src="/people/employees.webp" width="80" height="250" quality="100" objectFit="contain" />
                    <span className={styles.title}>
                        <span>Employees:</span>
                        <span>{data.company.employees}+</span>
                    </span>
                </div>
            </div>
            <div className={styles.otherinfo}>
                <div className={styles.headquartersimage}>
                    <Image src="/headquarters.jpg" width="400" height="300" quality="100" />
                </div>
                <div className={styles.otherinfoblock}>
                    <div className={styles.info}>
                        <div className={styles.headquarters}>
                            <span>Headquarters: {data.company.headquarters.address}, {data.company.headquarters.city}, {data.company.headquarters.state}</span>
                        </div>
                        <span>Founded: {data.company.founded}</span>
                        <span>Valuation: ${data.company.valuation}</span>
                        <span>No. of Vehicles: {data.company.vehicles}</span>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.box}>
                            <a href={data.company.links.twitter} className={`${styles.twitter} ${styles.link}`}>
                                    <Image src="/links/twitter_white_transparent.png" width="25" height="25" quality="100" />
                            </a>
                            <a href={data.company.links.elon_twitter} className={`${styles.elontwitter} ${styles.link}`}>
                                    <Image src="/links/elon_icon.png" width="25" height="25" quality="100" />
                            </a>
                            <a href={data.company.links.website} className={`${styles.website} ${styles.link}`}>
                                    <Image src="/links/spacex-icon.png" width="25" height="25" quality="100" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About;