import styles from "./modal.module.scss"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap";
import ReactPlayer from 'react-player/youtube'

import ImageGallery from 'react-image-gallery'
import Toggle from '../../ToggleSwitch/Toggle'


const Modal = ({missionPatch, launch, setModal, close, modal, modalWidth, modalHeight}) => {
    const [mediaControlToPics, setMediaControlToPics] = useState(true)
    const modalContainer = useRef(null)
    const badge = useRef(null)
    const galleryItem = useRef(null)
    const images = []

    const tweenDone = (e) => {
        close(e)
        setModal(false)
    }

    const handleClose = e => {
        const tl = gsap.timeline()
        tl.fromTo(modalContainer.current, {width: modalWidth*3, height: modalHeight*2, opacity: 1}, {width: modalWidth, height: modalHeight, opacity: 0, duration: 0.5, onComplete: () => tweenDone(e)})
    }

    useEffect(() => {
        if (modal === true) {
            gsap.set(modalContainer.current, {zIndex: "98", display: "flex"})
            const tl = gsap.timeline()
            tl.fromTo(modalContainer.current, {width: modalWidth, height: modalHeight, opacity: 0, position: "relative"}, {width: modalWidth*3, height: modalHeight*2, opacity: 1,position: "fixed", duration: 0.5})

            if (launch.links.video_link === null) {
                setMediaControlToPics(true)
            } else if (launch.links.flickr_images.length <= 0 && launch.links.video_link.length >= 2 && mediaControlToPics === true) {
                setMediaControlToPics(false)
            }
        }
    }, [])

    useEffect(() => {
        if (launch.links.flickr_images.length <= 0) {
            const obj = {
                original: '/image.svg',
                thumbnail: '/image.svg'
            }
            images.push(obj)
        } else {
            for (const key in launch.links.flickr_images) {
                const obj = {
                    original: launch.links.flickr_images[key],
                    thumbnail: launch.links.flickr_images[key]
                }
                images.push(obj)
            }
        }
        gsap.set(galleryItem.current, {height: modalHeight, maxHeight: modalHeight})
    })

    const handleFullScreen = bool => {
        let fullscreenGallery = document.getElementsByClassName('image-gallery')
        if (bool) {
            gsap.set(fullscreenGallery, {minHeight: "100vh", maxHeight: "50vh"})
        } 
        else {
            gsap.set(fullscreenGallery, {minHeight: "", maxHeight: ""})
        }
    }

    const MediaDisplay = ({selector}) => {
        if (selector) {
            return (
                <div className={styles.gallery}>
                    <div className={styles.galleryitem} ref={galleryItem}>
                        <ImageGallery items={images} lazyLoad={true} showPlayButton={false} useBrowserFullscreen={false} onScreenChange={handleFullScreen} />
                    </div>
                </div>
            )
        } else {
            if (launch.links.video_link === null || launch.links.video_link.length <= 1) {
                return (
                    <span>No Video Link Found!</span>
                )
            }
            return (
                <div className={styles.player}>
                    <ReactPlayer url={launch.links.video_link} controls={true} pip={true} stopOnUnmount={false} />
                </div>
            )
        }
    }

    return (
        <div className={styles.modalcontainer} ref={modalContainer}>
            <span className={styles.close} onClick={handleClose}>
                <Image src="/cancel.svg" width="20" height="20" />
            </span>
            <span className={styles.mediacontrol}>
                <Toggle id={launch.mission_name} enabled={mediaControlToPics} onStateChange={() => setMediaControlToPics(!mediaControlToPics)} leftLabel="pics" rightLabel="video" />
            </span>
            <MediaDisplay selector={mediaControlToPics} />
            <div className={styles.info}>
                <div className={styles.header}>
                    <div className={styles.patchcontainer} ref={badge}>
                        {missionPatch}
                    </div>
                    <div className={styles.title}>
                        <span className={styles.launchNameTitle}>Launch Name: {launch.mission_name}</span>
                    </div>
                </div>
                <div className={styles.modalcontent}>
                    <span className={styles.info}><span className={styles.key}>Time Of Launch:</span> {launch.launch_date_local}</span>
                    <span className={styles.info}><span className={styles.key}>Lauch Site:</span> {launch.launch_site.site_name_long}</span>
                    <span className={styles.info}><span className={styles.key}>Rocket:</span> {launch.rocket.rocket_name}</span>
                    <span className={`${styles.ships} ${styles.info}`}>
                    <span className={styles.key}>Drone Ships Used:</span>
                        <ul>
                            {launch.ships.map(ship => {
                                return (
                                    <li key={ship.name} className={styles.ship}>{ship.name}</li>
                                )
                            })}
                        </ul>
                    </span>
                    <span className={styles.info}><a href={launch.links.article_link}>Read More</a></span>
                </div>
            </div>
        </div>
    ) 
}

export default Modal