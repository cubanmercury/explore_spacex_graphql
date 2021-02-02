import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

import styles from "./burgermenu.module.scss"

const BurgerMenu = ({ menu, toggleMenu }) => {
  const burgerMenu = useRef(null)
  useEffect(() => {
    menu
      ? gsap.fromTo(
          burgerMenu.current,
          { rotate: 0 },
          { rotate: 90, duration: 0.5 }
        )
      : gsap.to(
          burgerMenu.current,
          { rotate: 0, duration: 0.5 }
        )
  }, [menu])

  const handleClick = (event) => {
    event.preventDefault()
    toggleMenu(event)
  }

  return (
    <>
      <a
        id="burger-menu"
        href="#"
        ref={burgerMenu}
        onClick={handleClick}
        className={styles.burgerMenu}
      >
        <Image src="/menu.svg" width="40" height="64" />
      </a>
    </>
  )
}

export default BurgerMenu
