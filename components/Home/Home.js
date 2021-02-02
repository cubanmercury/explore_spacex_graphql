import Image from "next/image"
import { useEffect } from "react"
import styles from "./Home.module.scss"
import { gsap } from "gsap"
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
// import spacevideo from '../../public/dynamic/nebula.mp4'

import Roadster from "./blocks/Roadster"
import Categories from "./blocks/Categories"
import About from "./blocks/About"


const Home = ({ props }) => {
  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    let tl = gsap.timeline();
    tl.fromTo(".fadein", { opacity: 0 }, { opacity: 1, duration: 2.5 });
    tl.fromTo(".stackin", {opacity: 0, x: -25}, {opacity: 1, x: 0, duration: 2.5, stagger: 0.2}, 0.5);
    tl.fromTo(".downchevron", {opacity: 0, y: -25}, {opacity: 1, y: 0, duration: 1.5}, 1.2);
  });

  const handleClick = (e) => {
    if (typeof window !== 'undefined') {
      gsap.to(window, {duration: 2, scrollTo: '#categories', ease: "power2"});
    }
  }

  const handleHoverOn = (e) => {
    gsap.to(".downchevron", {y: 10, duration: 0.55});
  }
  const handleHoverOff = (e) => {
    gsap.to(".downchevron", {y: 0, duration: 0.5});
  }


  return (
    <div className={styles.home}>
      <div className={styles.herocontainer + " fadein"}>
        <span className={styles.herotext}>
          <span className={`${styles.herotextitem} stackin`}>Exploring</span>
          <span className={`${styles.herotextitem} stackin`}> SpaceX</span>
          <span className={`${styles.herotextitem} stackin`}> through</span>
          <span className={`${styles.herotextitem} stackin`}> GraphQL</span>
        </span>
        <Image
          className={styles.hero}
          src="/dragonCapsule.jpg"
          layout="fill"
          objectFit="cover"
          priority="true"
          quality="100"
          style={{ position: "relative" }}
        />
        <a id={styles.chevron} href="#" onClick={handleClick} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff} className={styles.burgerMenu}>
          <Image className="downchevron" src="/down-chevron.svg" width="105" height="75" />
        </a>
      </div>

      <Categories />

      <Roadster />

      <About />

    </div>
  );
};

export default Home;
