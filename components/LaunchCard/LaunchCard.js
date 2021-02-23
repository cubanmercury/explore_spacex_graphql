import styles from "./launchcard.module.scss"
import Image from "next/image"
import { gsap } from "gsap"
import { useState, useRef, useEffect } from "react"
import Modal from "./Modal"
import { Media, useMedia, mediaQuery } from "../../lib/media"

export const LaunchCard = ({ launch, opened, setOpened }) => {
  const [modal, setModal] = useState(false)
  const [cardWidth, setCardWidth] = useState(null)
  const [cardHeight, setCardHeight] = useState(null)
  const [modalWidth, setModalWidth] = useState(0)
  const [modalHeight, setModalHeight] = useState(0)
  const card = useRef(null)
  const badge = useRef(null)

  const isDesktop = useMedia.greaterThanOrEqual('m')

  let missionPatch
  if (launch.links.mission_patch) {
    missionPatch = (
      <img
        className={styles.patch}
        src={launch.links.mission_patch}
        width="150"
        height="150"
      />
    )
  } 
  else if (modal) {
    missionPatch = (
      <img className={styles.patch} src="/image.svg" width="150" height="150" />
    )
  } 
  else {
    missionPatch = (
      <div className={styles.nopatchcontainer}>
        <img
          className={styles.patch}
          src="/image.svg"
          width="150"
          height="150"
        />{" "}
        <span className={styles.nopatch}>No Mission Patch Found</span>
      </div>
    )
  }

  useEffect(() => {
    if (isDesktop) {
      setModalWidth(card.current.getBoundingClientRect().width * 1.2)
      setModalHeight(card.current.getBoundingClientRect().height * 1.2)  
    } else {
      setModalWidth(card.current.getBoundingClientRect().width)
      setModalHeight(card.current.getBoundingClientRect().height)
    }
    

    if (opened.id === launch.id && modal === false) {
      setModal(true)
      if (process.browser) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
      }
    }
  })

  const handleMouseEnter = (e) => {
    if (e.currentTarget.id !== opened.id) {
      gsap.fromTo(
        e.currentTarget,
        { y: 0, x: 0, boxShadow: "none" },
        { y: -5, x: -5, boxShadow: "4px 4px 20px 4px #a7a9ac", duration: 0.4 }
      )
    }
  }
  const handleMouseLeave = (e) => {
    if (e.currentTarget.id !== opened.id) {
      gsap.fromTo(
        e.currentTarget,
        { y: -5, x: -5, boxShadow: "4px 4px 20px 4px #a7a9ac" },
        { y: 0, x: 0, boxShadow: "none", duration: 0.4 }
      )
    }
  }

  const handleClick = (e) => {
    if (e.currentTarget.id !== opened.opened) {
      handleMouseLeave(e)
      setOpened({ id: e.currentTarget.id })
      const defaultWidth = e.currentTarget.getBoundingClientRect().width
      const defaultHeight = e.currentTarget.getBoundingClientRect().height
      setCardWidth(defaultWidth)
      setCardHeight(defaultHeight)
    }
  }

  const handleClose = (e) => {
    setOpened({})
  }

  const RenderModal = () => {
    if (Modal) {
      return (
        <Modal
          missionPatch={missionPatch}
          isMissionPatch={launch?.links.mission_patch ? true : false}
          launch={launch}
          setModal={(bool) => setModal(bool)}
          close={handleClose}
          modal={modal}
          modalWidth={modalWidth}
          modalHeight={modalHeight}
        />
      )
    }
  }

  return (
    <>
      <li
        key={launch.id}
        id={launch.id}
        className={styles.launchCard + ` stackin`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className={styles.cardcontent} ref={card}>
          <div className={styles.patchcontainer} ref={badge}>
            {missionPatch}
          </div>
          <h3 className={styles.launchNameTitle}>{launch.mission_name}</h3>
        </div>
      </li>
      <RenderModal />
    </>
  )
}
