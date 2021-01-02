import { useQuery } from "@apollo/react-hooks";
import LAUNCHES_QUERY from "../../graphql/recentLaunches.query";
import LaunchCard from "../LaunchCard/LaunchCard";
import styles from "./recentlaunches.module.scss";
import { gsap } from "gsap";
import { useEffect, useState } from "react";

const Launches = () => {
  const [opened, setOpened] = useState({})
  const [cardWidth, setCardWidth] = useState(null)
  const [cardHeight, setCardHeight] = useState(null)
  useEffect(() => {
    let tl = gsap.timeline();
    tl.fromTo(
      ".stackin",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
    );
  }, []);

  const { data, loading, error } = useQuery(LAUNCHES_QUERY);
  if (data) console.log("recent launch data: ", data)

  if (loading) {
    return (
      <div>
        <p className={styles.launchListTitle}>Recent launches</p>
        {/* <p>Loading...</p> */}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className={styles.launchListTitle}>Recent launches</p>
        <p>Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  const handleMouseEnter = e => {
    if(e.currentTarget.id !== opened.opened) {
      gsap.fromTo(e.currentTarget, {y: 0, x: 0, boxShadow: "none"}, {y: -5, x: -5, boxShadow: "4px 4px 20px 4px #a7a9ac", duration: 0.4})
    }
  }
  const handleMouseLeave = e => {
    if (e.currentTarget.id !== opened.opened) {
      gsap.fromTo(e.currentTarget, {y: -5, x: -5, boxShadow: "4px 4px 20px 4px #a7a9ac"}, {y: 0, x: 0, boxShadow: "none", duration: 0.4})
    }
  }

  const handleClick = e => {
    console.log("clicked: ", e.currentTarget, opened, cardWidth, cardHeight)
    if (e.currentTarget.id !== opened.opened) {
      setOpened({"opened": e.currentTarget.id})
      const defaultWidth = e.currentTarget.getBoundingClientRect().width
      const defaultHeight = e.currentTarget.getBoundingClientRect().height
      setCardWidth(defaultWidth)
      setCardHeight(defaultHeight)
      console.log("CardWidth, CardHeight: ", cardWidth, cardHeight)
      const tl = gsap.timeline()
      tl.to(e.currentTarget, {zIndex: "100", duration: 0.1})
      tl.fromTo(e.currentTarget, {width: defaultWidth, height: defaultHeight, position: "relative"}, {width: defaultWidth*3, height: defaultHeight*2, position: "absolute", duration: 1})
    }
  }

  const handleClose = e => {
    console.log("handleClose: ", e, cardHeight, cardWidth)
    setOpened({})
    const tl = gsap.timeline()
    tl.fromTo(e.currentTarget.parentElement.parentElement, {width: cardWidth*3, height: cardHeight*2}, {width: cardWidth, height: cardHeight, duration: 1})
    tl.to(e.currentTarget.parentElement.parentElement, {zIndex: 1, position: "relative", duration: 0.1}, 0.6)
  }

  console.log("new opened state: ", opened)

  return (
    <div>
      <p className={styles.launchListTitle}>Recent launches</p>
      <ul className={styles.launchList}>
        {data.launchesPast.map((launch) => {
          return (
            <li key={launch.id} id={launch.id} className={styles.launchCard + ` stackin`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
              <LaunchCard launch={launch} cardOpen={opened} close={handleClose} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Launches;