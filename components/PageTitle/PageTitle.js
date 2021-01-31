import styles from "./pageTitle.module.scss";
import { gsap } from "gsap";
import { useEffect } from "react";

export const PageTitle = ({title}) => {

  useEffect(() => {
    let tl = gsap.timeline();
    tl.fromTo(
      ".title-transition",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <>
      <h1 className={`${styles.title} title-transition`}>{title}</h1>
    </>
  )
}
