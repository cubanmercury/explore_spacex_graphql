import styles from './launchcard.module.scss';
import Image from "next/image"
import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";
import Modal from './Modal/Modal';

const LaunchCard = ({ launch, opened, setOpened }) => {
    const [modal, setModal] = useState(false)
    const [cardWidth, setCardWidth] = useState(null)
    const [cardHeight, setCardHeight] = useState(null)
    const [modalWidth, setModalWidth] = useState(0)
    const [modalHeight, setModalHeight] = useState(0)
    const card = useRef(null)
    const badge = useRef(null)

    let missionPatch;
    if (launch.links.mission_patch) {
        missionPatch = <img className={styles.patch} src={launch.links.mission_patch} width="300" height="250" />
    } else {
        missionPatch = <span className={styles.nopatch}>No Mission Patch Found</span>
    }


    useEffect(() => {
        setModalWidth(card.current.getBoundingClientRect().width*1.2)
        setModalHeight(card.current.getBoundingClientRect().height*1.2)

        if (opened.id === launch.id && modal === false) {
            setModal(true)
            // gsap.to(badge.current, {x: -modalWidth*1.2, y: modalHeight*1.2, height: "45%", duration: 1.25})
        }
    })
    
    const handleMouseEnter = e => {
      if(e.currentTarget.id !== opened.id) {
        gsap.fromTo(e.currentTarget, {y: 0, x: 0, boxShadow: "none"}, {y: -5, x: -5, boxShadow: "4px 4px 20px 4px #a7a9ac", duration: 0.4})
      }
    }
    const handleMouseLeave = e => {
      if (e.currentTarget.id !== opened.id) {
        gsap.fromTo(e.currentTarget, {y: -5, x: -5, boxShadow: "4px 4px 20px 4px #a7a9ac"}, {y: 0, x: 0, boxShadow: "none", duration: 0.4})
      }
    }
  
    const handleClick = e => {
      console.log("clicked: ", e.currentTarget, opened, cardWidth, cardHeight)
      if (e.currentTarget.id !== opened.opened) {
        handleMouseLeave(e)
        setOpened({"id": e.currentTarget.id})
        const defaultWidth = e.currentTarget.getBoundingClientRect().width
        const defaultHeight = e.currentTarget.getBoundingClientRect().height
        setCardWidth(defaultWidth)
        setCardHeight(defaultHeight)
        // const tl = gsap.timeline()
        // tl.to(e.currentTarget, {zIndex: "98", duration: 0.1})
        // tl.fromTo(e.currentTarget, {width: defaultWidth, height: defaultHeight, position: "relative"}, {width: defaultWidth*3, height: defaultHeight*2, position: "absolute", duration: 0.5})
      }
    }

    const handleClose = e => {
      console.log("handleClose: ", e.currentTarget, cardHeight, cardWidth)
      setOpened({})
      // const tl = gsap.timeline()
      // tl.fromTo(e.currentTarget.parentElement.parentElement, {width: cardWidth*3, height: cardHeight*2}, {width: cardWidth, height: cardHeight, duration: 0.5})
      // tl.to(e.currentTarget.parentElement.parentElement, {zIndex: 1, position: "relative", duration: 0.1}, 0.4)
    }  

    const RenderModal = () => {
        if (Modal) {
            return (
                <Modal missionPatch={missionPatch} launch={launch} setModal={(bool) => setModal(bool)} close={handleClose} modal={modal} modalWidth={modalWidth} modalHeight={modalHeight} />
            )
        }
    }

    return (
      <>
        <li key={launch.id} id={launch.id} className={styles.launchCard + ` stackin`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
          <div className={styles.cardcontent} ref={card}>
            <div className={`${styles.patchcontainer}`} ref={badge}>
                {missionPatch}
            </div>
            <h3 className={styles.launchNameTitle}>{launch.mission_name}</h3>
          </div>
        </li>
        <RenderModal />
      </>

    )
}

export default LaunchCard;


