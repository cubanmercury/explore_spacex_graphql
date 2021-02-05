import styles from "./rockets.module.scss"
import PageTitle from "../PageTitle"
import Error from "../Error"
import Image from "next/image"
import { gsap } from "gsap"

export const Rockets = ({ rocketsResult }) => {
  console.log("rocketResults: ", rocketsResult)
  const rockets = rocketsResult?.data

  const BackgroundImg = ({ rocketName, className }) => {
    let imgSrc
    switch (rocketName) {
      case "Falcon 1":
        imgSrc = "/rockets/falcon_1.jpg"
        break
      case "Falcon 9":
        imgSrc = "/rockets/falcon_9.webp"
        break
      case "Falcon Heavy":
        imgSrc = "/rockets/falcon_heavy.webp"
        break
      case "Starship":
        imgSrc = "/rockets/starship.jpg"
        break
      default:
        imgSrc = "/image.svg"
    }

    return <Image src={imgSrc} layout="fill" objectFit="cover" quality={100} />
  }

  const handleMouseOver = (e) => {
    console.log("e: ", e.currentTarget.firstChild.firstChild.firstChild)
    console.log("e2: ", e.currentTarget.querySelector('.bg').querySelector('img'))
    gsap.to(
      e.currentTarget.querySelector('.bg').querySelector('img'),
      { filter: "blur(0px)", duration: 0.4 }
    )
    gsap.to(e.currentTarget, {width: "200%", maxWidth: "1200px", duration: 0.4})
  }

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget.querySelector('.bg').querySelector('img'), {
      filter: "blur(2px)",
      duration: 0.4,
    })
    gsap.to(e.currentTarget, {width: "24%", maxWidth: "400px", duration: 0.4})
  }
  return (
    <div className={styles.rockets}>
      <PageTitle title="Rockets &amp; Capsules" />
      {!rockets && <Error message="No rockets or capsules found" />}
      <ul className={styles.rocketslist}>
        {rockets?.map((rocket, index) => (
          <li
            className={styles.rocket}
            key={index}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`${styles.bg} bg`}>
              <BackgroundImg rocketName={rocket.name} />
            </div>
            <div className={styles.title}>
              <p className={styles.titletext}>{rocket.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
