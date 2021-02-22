import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import styles from "./rockets.module.scss"
import PageTitle from "../PageTitle"
import Error from "../Error"
import Image from "next/image"
import { gsap } from "gsap"

export const Rockets = ({ rocketsResult }) => {
  // console.log("rockets: ", rocketsResult)
  const [cardHeight, setCardHeight] = useState(0)
  const info = useRef(null)
  const Router = useRouter()
  const rockets = rocketsResult?.data

  useEffect(() => {
    setCardHeight(
      document.querySelector(".rocketcard").getBoundingClientRect().height
    )
  })

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

  const wikiRedirect = (e, link) => {
    Router.push(link)
  }

  const handleMouseEnter = (e) => {
    const tl = gsap.timeline()
    tl.to(e.currentTarget.querySelector(".bg").querySelector("img"), {
      filter: "grayscale(0)",
      duration: 0.4,
    })
    tl.to(
      e.currentTarget,
      {
        width: "200%",
        maxWidth: "1200px",
        duration: 0.4,
      },
      0
    )
    tl.to(
      e.currentTarget.querySelector(".title"),
      {
        height: "100%",
        rotate: 90,
        y: cardHeight / 2 - 15,
        x: "175%",
        duration: 1,
      },
      0.2
    )
    tl.to(
      e.currentTarget.querySelector(".rocket-info"),
      { display: "flex", opacity: 1, duration: 0.5 },
      0.2
    )
  }

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget.querySelector(".bg").querySelector("img"), {
      filter: "grayscale(1)",
      duration: 0.4,
    })
    gsap.to(e.currentTarget, { width: "24%", maxWidth: "400px", duration: 0.4 })
    gsap.to(e.currentTarget.querySelector(".title"), {
      left: 0,
      height: 200,
      bottom: "inherit",
      rotate: 0,
      y: 0,
      x: 0,
      duration: 1,
    })
    gsap.to(e.currentTarget.querySelector(".rocket-info"), {
      display: "none",
      opacity: 0,
      duration: 0.5,
    })
  }
  return (
    <div className={styles.rockets}>
      <PageTitle title="Rockets &amp; Capsules" />
      {!rockets && <Error message="No rockets or capsules found" />}
      <ul className={styles.rocketslist}>
        {rockets?.map((rocket, index) => (
          <li
            className={`${styles.rocket} rocketcard`}
            key={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`${styles.bg} bg`}>
              <BackgroundImg rocketName={rocket?.name} />
            </div>
            <div className={`${styles.title} title`}>
              <p className={styles.titletext}>{rocket?.name}</p>
            </div>

            <div className={`${styles.info} rocket-info`}>
              <div className={styles.infotitle}>
                <h6>{rocket?.name}</h6>
                <p>{rocket?.description}</p>
              </div>
              <div className={styles.content}>
                <div className={`${styles.col1} ${styles.col}`}>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>First Flight:</p>
                    <p className={styles.value}>{rocket?.first_flight}</p>
                  </span>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Active:</p>
                    <p className={styles.value}>{rocket?.active ? "yes" : "no"}</p>
                  </span>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Height:</p>
                    <p className={styles.value}>{rocket?.height.meters} m</p>
                  </span>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Mass:</p>
                    <p className={styles.value}>{rocket?.mass.kg} kg</p>
                  </span>
                </div>
                <div className={`${styles.col2} ${styles.col}`}>
                  <p className={styles.enginetitle}>Engines:</p>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Type:</p>
                    <p className={styles.value}>{rocket?.engines.type}</p>
                  </span>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Number:</p>
                    <p className={styles.value}>{rocket?.engines.number}</p>
                  </span>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Propellant 1:</p>
                    <p className={styles.value}>
                      {rocket?.engines.propellant_1}
                    </p>
                  </span>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Propellant 2:</p>
                    <p className={styles.value}>
                      {rocket?.engines.propellant_2}
                    </p>
                  </span>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Thrust to Weight:</p>
                    <p className={styles.value}>
                      {rocket?.engines.thrust_to_weight}
                    </p>
                  </span>
                  <span className={styles.infocontainer}>
                    <p className={styles.key}>Thrust in a Vacuum:</p>
                    <p className={styles.value}>
                      {rocket?.engines.thrust_vacuum.kN} kN
                    </p>
                  </span>
                </div>
              </div>
              <div className={styles.wiki}>
                <button
                  className={styles.button}
                  onClick={(e) => wikiRedirect(e, rocket?.wikipedia)}
                >
                  <span>More Info</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
