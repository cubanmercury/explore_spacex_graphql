import styles from "./modal.module.scss"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { gsap } from "gsap"
import ReactPlayer from "react-player/youtube"

import ImageGallery from "react-image-gallery"
import Toggle from "../../ToggleSwitch/Toggle"

import { Media, useMedia, mediaQuery } from "../../../lib/media"

export const Modal = ({
  missionPatch,
  launch,
  setModal,
  close,
  modal,
  modalWidth,
  modalHeight,
  isMissionPatch,
}) => {
  const [mediaControlToPics, setMediaControlToPics] = useState(true)
  const [viewSwitcherCurrent, setViewSwitcherCurrent] = useState("info")
  const modalContainer = useRef(null)
  const badge = useRef(null)
  const galleryItem = useRef(null)
  const mediaBlock = useRef(null)
  const infoBlock = useRef(null)
  const images = []
  const isDesktop = useMedia.greaterThanOrEqual("m")
  const Router = useRouter()

  const tweenDone = (e) => {
    close(e)
    setModal(false)
  }

  const handleClose = (e) => {
    if (process.browser) {
      document.getElementsByTagName('html')[0].style.overflow = 'auto'
    }
    const tl = gsap.timeline()
    if (isDesktop) {
      tl.fromTo(
        modalContainer.current,
        {
          width: modalWidth * 3,
          height: modalHeight * 2,
          opacity: 1,
        },
        {
          width: modalWidth,
          height: modalHeight,
          opacity: 0,
          duration: 0.5,
          onComplete: () => tweenDone(e),
        }
      )
    } else {
      tl.fromTo(
        modalContainer.current,
        {
          width: modalWidth,
          height: modalHeight,
          opacity: 1,
        },
        {
          width: modalWidth,
          height: modalHeight,
          opacity: 0,
          duration: 0.5,
          onComplete: () => tweenDone(e),
        }
      )
    }
  }
  const viewSwitcherToggle = (e, view) => {
    console.log("viewSwitcher view: ", e.currentTarget, view)
    if (view === viewSwitcherCurrent) return
    else {
      const tl = gsap.timeline()
      tl.to(e.currentTarget, { backgroundColor: "#fff", duration: 0.4 })
      tl.to(e.currentTarget, {
        backgroundColor: "rgba(174, 180, 183, 0.5)",
        duration: 0.4,
      })
      if (view === "info") {
        gsap.to(e.currentTarget.nextElementSibling, {
          backgroundColor: "rgba(174, 180, 183, 0.15)",
          duration: 0.4
        })
        gsap.to(
          mediaBlock.current,
          { width: 0, opacity: 0, display: "none", duration: 0.2 },
          0
        )
        gsap.to(
          infoBlock.current,
          { width: "100%", opacity: 1, display: "flex", duration: 0.2 },
          0.2
        )
      } else if (view === "media") {
        gsap.to(e.currentTarget.previousElementSibling, {
          backgroundColor: "rgba(174, 180, 183, 0.15)",
          duration: 0.4
        })
        gsap.to(
          infoBlock.current,
          { width: 0, opacity: 0, display: "none", duration: 0.2 },
          0
        )
        gsap.to(
          mediaBlock.current,
          { width: "100%", opacity: 1, display: "flex", duration: 0.2 },
          0.2
        )
      } else {
        console.log("view doesn't meet values set in Modal.js: ", view)
      }
      setViewSwitcherCurrent(view)
    }
  }
  const handleReadMore = (e, link) => {
    if (link) Router.push(link)
  }

  useEffect(() => {
    if (modal === true) {
      gsap.set(modalContainer.current, { zIndex: "98", display: "flex" })
      const tl = gsap.timeline()
      if (isDesktop) {
        tl.fromTo(
          modalContainer.current,
          {
            width: modalWidth,
            height: modalHeight,
            opacity: 0,
            position: "relative",
          },
          {
            width: modalWidth * 3,
            height: modalHeight * 2,
            opacity: 1,
            position: "fixed",
            duration: 0.5,
          }
        )
      } else {
        tl.fromTo(
          modalContainer.current,
          {
            width: modalWidth,
            height: modalHeight,
            opacity: 0,
            position: "relative",
          },
          {
            width: modalWidth,
            height: "68vh",
            opacity: 1,
            position: "fixed",
            duration: 0.5,
          }
        )
      }

      if (launch.links.video_link === null) {
        setMediaControlToPics(true)
      } else if (
        launch.links.flickr_images.length <= 0 &&
        launch.links.video_link.length >= 2 &&
        mediaControlToPics === true
      ) {
        setMediaControlToPics(false)
      }
    }
  }, [])

  useEffect(() => {
    if (launch.links.flickr_images.length <= 0) {
      const obj = {
        original: "/image.svg",
        thumbnail: "/image.svg",
      }
      images.push(obj)
    } else {
      for (const key in launch.links.flickr_images) {
        const obj = {
          original: launch.links.flickr_images[key],
          thumbnail: launch.links.flickr_images[key],
        }
        images.push(obj)
      }
    }
    gsap.set(galleryItem.current, {
      height: modalHeight,
      maxHeight: modalHeight,
    })
  })

  const handleFullScreen = (bool) => {
    let fullscreenGallery = document.getElementsByClassName("image-gallery")
    if (bool) {
      gsap.set(fullscreenGallery, { minHeight: "100vh", maxHeight: "50vh" })
    } else {
      gsap.set(fullscreenGallery, { minHeight: "", maxHeight: "" })
    }
  }

  const MediaDisplay = ({ selector }) => {
    if (selector) {
      return (
        <div className={styles.gallery}>
          <div className={styles.galleryitem} ref={galleryItem}>
            <ImageGallery
              items={images}
              lazyLoad={true}
              showPlayButton={false}
              useBrowserFullscreen={false}
              onScreenChange={handleFullScreen}
            />
          </div>
        </div>
      )
    } else {
      if (
        launch.links.video_link === null ||
        launch.links.video_link.length <= 1
      ) {
        return <span>No Video Link Found!</span>
      }
      return (
        <div className={styles.player}>
          <ReactPlayer
            url={launch.links.video_link}
            controls={true}
            pip={true}
            stopOnUnmount={false}
            width={modalWidth}
            height="auto"
          />
        </div>
      )
    }
  }

  return (
    <div className={styles.modalcontainer} ref={modalContainer}>
      <span className={styles.close} onClick={handleClose}>
        <Image src="/cancel.svg" width="20" height="20" />
      </span>

      <div className={styles.modalcontentcontainer}>
        <div className={styles.mediablock} ref={mediaBlock}>
          <span className={styles.mediacontrol}>
            <Toggle
              id={launch.mission_name}
              enabled={mediaControlToPics}
              onStateChange={() => setMediaControlToPics(!mediaControlToPics)}
              leftLabel="pics"
              rightLabel="video"
            />
          </span>
          <MediaDisplay selector={mediaControlToPics} />
        </div>

        <div className={styles.info} ref={infoBlock}>
          <div className={styles.header}>
            {isMissionPatch && (
              <div className={styles.patchcontainer} ref={badge}>
                {missionPatch}
              </div>
            )}
            <div className={styles.title}>
              <span className={styles.launchNameTitle}>
                {launch.mission_name}
              </span>
            </div>
          </div>
          <div className={styles.modalcontent}>
            <span className={styles.infobite}>
              <span className={styles.key}>Time Of Launch</span>
              <span className={styles.value}>{launch.launch_date_local}</span>
            </span>
            <span className={styles.infobite}>
              <span className={styles.key}>Lauch Site</span>
              <span className={styles.value}>
                {launch.launch_site.site_name_long}
              </span>
            </span>
            <span className={styles.infobite}>
              <span className={styles.key}>Rocket</span>
              <span className={styles.value}>{launch.rocket.rocket_name}</span>
            </span>
            {launch.ships.length >= 1 && (
              <span className={`${styles.ships} ${styles.infobite}`}>
                <span className={styles.key}>Drone Ships Used</span>
                <ul className={styles.value}>
                  {launch.ships.map((ship) => {
                    return (
                      <li key={ship.name} className={styles.ship}>
                        <Link href={`/drone-ships/${ship.id}`}>
                          {ship.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </span>
            )}
            {launch?.links.article_link && (
              <span className={styles.buttoncontainer}>
                <button
                  className={styles.button}
                  onClick={(e) => handleReadMore(e, launch?.links.article_link)}
                >
                  <span>Read More</span>
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.viewswitchercontainer}>
        <div className={styles.viewswitcher}>
          <div
            className={`${styles.option} ${styles.infoview}`}
            onClick={(e) => viewSwitcherToggle(e, "info")}
          >
            <p>Info</p>
          </div>
          <div
            className={`${styles.option} ${styles.mediaview}`}
            onClick={(e) => viewSwitcherToggle(e, "media")}
          >
            <p>Media</p>
          </div>
        </div>
      </div>
    </div>
  )
}
