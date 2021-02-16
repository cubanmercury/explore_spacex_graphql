import Image from "next/image"
import Link from "next/link"
import styles from "./categories.module.scss"
import { useMediaQuery } from "react-responsive"
import { gsap } from "gsap"

const Categories = () => {
  const isLargeViewport = useMediaQuery({ query: "(max-width: 768px)" })
  const handleHoverOn = (e) => {
    if (isLargeViewport) {
      e.currentTarget.firstElementChild.style.display = "flex"
    }
  }
  const handleHoverOff = (e) => {
    if (isLargeViewport) {
      e.currentTarget.firstElementChild.style.display = "none"
    }
  }

  return (
    <div id="categories" className={styles.categories}>
      <div className={styles.cardcont}>
        <div className={`${styles.cardcontone} ${styles.cardconttype}`}>
          <Link href="/rockets-capsules">
            <a className={styles.link}>
              <div
                className={styles.card}
                onMouseEnter={handleHoverOn}
                onMouseLeave={handleHoverOff}
              >
                <div className={styles.overlay}>
                  <span>Rockets &amp; capsules</span>
                </div>
                <span>
                  <Image
                    src="/dragonCapsule2.jpg"
                    quality="100"
                    width="300"
                    height="400"
                  />
                </span>
              </div>
            </a>
          </Link>
        </div>
        <div className={`${styles.cardconttwo} ${styles.cardconttype}`}>
          <Link href="/recent-launches">
            <a className={styles.link}>
              <div
                className={styles.card}
                onMouseEnter={handleHoverOn}
                onMouseLeave={handleHoverOff}
              >
                <div className={styles.overlay}>
                  <span>Recent Launches</span>
                </div>
                <span>
                  <Image
                    src="/spacex-falcon-heavy-launch.jpg"
                    quality="100"
                    width="300"
                    height="200"
                  />
                </span>
              </div>
            </a>
          </Link>
          <Link href="/future-launches">
            <a className={styles.link}>
              <div
                className={styles.card}
                onMouseEnter={handleHoverOn}
                onMouseLeave={handleHoverOff}
              >
                <div className={styles.overlay}>
                  <span>Future Launches</span>
                </div>
                <span>
                  <Image
                    src="/satellite.jpg"
                    quality="100"
                    width="300"
                    height="200"
                  />
                </span>
              </div>
            </a>
          </Link>
          <Link href="/missions">
            <a className={styles.link}>
              <div
                className={styles.card}
                onMouseEnter={handleHoverOn}
                onMouseLeave={handleHoverOff}
              >
                <div className={styles.overlay}>
                  <span>Missions</span>
                </div>
                <span>
                  <Image
                    src="/dragonCockpit.jpg"
                    quality="100"
                    width="300"
                    height="200"
                  />
                </span>
              </div>
            </a>
          </Link>
          <Link href="/drone-ships">
            <a className={styles.link}>
              <div
                className={styles.card}
                onMouseEnter={handleHoverOn}
                onMouseLeave={handleHoverOff}
              >
                <div className={styles.overlay}>
                  <span>Drone Ships</span>
                </div>
                <span>
                  <Image
                    src="/spacex-splash-banner.jpg"
                    quality="100"
                    width="300"
                    height="200"
                  />
                </span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Categories
