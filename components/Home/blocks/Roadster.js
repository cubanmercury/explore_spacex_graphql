import { useEffect, useRef, useState } from "react"
import styles from "./roadster.module.scss"
import Image from "next/image"
import ROADSTER from "../../../graphql/roadster.query"
import { useQuery } from "@apollo/react-hooks"
import SplitText from "gsap/dist/TextPlugin"
import { gsap } from "gsap"
import Toggle from "../../ToggleSwitch/Toggle"
import { useMedia } from "../../../lib/media"

const Roadster = () => {
  const isLargeViewport = useMedia.greaterThanOrEqual('m')
  const details = useRef(null)
  const roadsterImg = useRef(null)
  const findOut = useRef(null)
  const title = useRef(null)
  const roadsterModal = useRef(null)
  const banner = useRef(null)
  const [metric, setMetric] = useState(true)
  let bannerWidth
  useEffect(() => {
    banner.current
      ? (bannerWidth = banner.current.getBoundingClientRect().width / 2)
      : (bannerWidth = "550px")
  })

  const { data, loading, error } = useQuery(ROADSTER)
  if (error) return <span>Error: {JSON.stringify(error)}</span>
  if (loading) return <span></span>
  const video = "/dynamic/nebula.mp4"

  const handleClick = (e) => {
    e.preventDefault()
    let tl = gsap.timeline()
    tl.fromTo(roadsterImg.current, { x: 0 }, { x: bannerWidth, duration: 1.5 })
    tl.fromTo(
      details.current,
      { opacity: 1, x: 0 },
      { opacity: 0, x: -500, duration: 1.5 },
      0.25
    )
    tl.fromTo(
      title.current,
      { opacity: 1, x: 0 },
      { opacity: 0, x: 500, duration: 1.5 },
      0.5
    )
    tl.fromTo(
      findOut.current,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -150, duration: 1.5 },
      0.65
    )
    tl.fromTo(
      roadsterModal.current,
      { opacity: 0, display: "none" },
      { opacity: 1, display: "flex", duration: 1 },
      0.75
    )
  }

  const handleClose = () => {
    let tl = gsap.timeline()
    tl.fromTo(
      roadsterModal.current,
      { opacity: 1, display: "flex" },
      { opacity: 0, display: "none", duration: 1 }
    )
    tl.fromTo(
      findOut.current,
      { opacity: 0, y: -150 },
      { opacity: 1, y: 0, duration: 1.5 },
      0.25
    )
    tl.fromTo(
      roadsterImg.current,
      { x: bannerWidth },
      { x: 0, duration: 1.5 },
      0.5
    )
    tl.fromTo(
      title.current,
      { opacity: 0, x: 500 },
      { opacity: 1, x: 0, duration: 1.5 },
      0.5
    )
    tl.fromTo(
      details.current,
      { opacity: 0, x: -500 },
      { opacity: 1, x: 0, duration: 1.5 },
      0.65
    )
  }

  const RoadsterDetails = ({ roadster }) => {
    if (roadster.details) return <span>{roadster.details}</span>
    return <span>details</span>
  }

  const ToggleUnits = () => {
    return (
      <Toggle
        enabled={metric}
        onStateChange={() => setMetric(!metric)}
        leftLabel="metric"
        rightLabel="imp"
      />
    )
  }

  const RoadsterModal = ({ roadster, handleClose }) => {
    const RenderUnits = () => {
      if (metric === true) {
        return (
          <>
            <div className={styles.bite}>
              <div className={styles.key}>Distance from Earth</div>
              <div className={styles.value}>{roadster.earth_distance_km}km</div>
            </div>
            <div className={styles.bite}>
              <div className={styles.key}>Distance from Mars</div>
              <div className={styles.value}>{roadster.mars_distance_km}km</div>
            </div>
            <div className={styles.bite}>
              <div className={styles.key}>Current Speed</div>
              <div className={styles.value}>{roadster.speed_kph}kph</div>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className={styles.bite}>
              <div className={styles.key}>Distance from Earth</div>
              <div className={styles.value}>{roadster.earth_distance_mi} miles</div>
            </div>
            <div className={styles.bite}>
              <div className={styles.key}>Distance from Mars</div>
              <div className={styles.value}>{roadster.mars_distance_mi} miles</div>
            </div>
            <div className={styles.bite}>
              <div className={styles.key}>Current Speed</div>
              <div className={styles.value}>{roadster.speed_mph}mph</div>
            </div>
          </>
        )
      }
    }
    return (
      <div className={styles.modalcontent}>
        <span className={styles.close} onClick={handleClose}>
          <Image src="/cancel.svg" width="20" height="20" />
        </span>
        <div className={styles.stats}>
          <div className={styles.bite}>
            <div className={styles.key}>Days since Launch</div>
            <div className={styles.value}>{roadster.period_days}</div>
          </div>
          <RenderUnits />
          <div className={styles.wiki}>
            <a href={roadster.wikipedia} className={styles.wikilink}>Read more</a>
          </div>
        </div>
        <span className={styles.toggle}>
          <ToggleUnits />
        </span>
      </div>
    )
  }

  return (
    <div id="roadsterbanner" className={styles.roadsterbanner} ref={banner}>
      <video className="videoTag" autoPlay="autoplay" loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className={styles.roadstercontent}>
        <div className={styles.roadster} ref={roadsterImg}>
          <Image
            src="/roadsterTransparentBackground.png"
            width="400"
            height="142"
            quality="100"
          />
        </div>
        {isLargeViewport && (
          <span className={styles.details} ref={details}>
            <RoadsterDetails roadster={data.roadster} />
          </span>
        )}

        <span className={styles.roadstertitle}>
          <span ref={title}>Where is Elon's Roadster</span>

          <span className={styles.buttoncont} ref={findOut}>
            <button className={styles.button} onClick={handleClick}>
              <span>Find Out</span>
            </button>
          </span>
        </span>

        <div className={styles.roadstermodal} ref={roadsterModal}>
          <RoadsterModal roadster={data.roadster} handleClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default Roadster
