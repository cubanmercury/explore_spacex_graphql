import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import styles from "./dropdown.module.scss"
import Image from "next/image"
import Link from "next/link"

export const Dropdown = ({ title, items }) => {
  const dropdown = useRef(null)
  const arrow = useRef(null)
  const [open, setOpen] = useState(false)

  const handleClick = (e) => {
    setOpen(!open)
    console.log("handleclick: ", e, dropdown, open)
  }

  useEffect(() => {
    console.log("useEffect open: ", open)
    if (open) {
      gsap.fromTo(
        dropdown.current,
        { opacity: 0, rotate: -90, transformOrigin: "50% 0%", display: "none" },
        {
          opacity: 1,
          rotate: 0,
          transformOrigin: "50% 0%",
          display: "flex",
          duration: 1,
          ease: "bounce"
        }
      )
      gsap.fromTo(
        arrow.current,
        { rotate: 180 },
        { rotate: 270, duration: 1 }
      )
    } else {
      gsap.to(dropdown.current, {
        opacity: 0,
        rotate: -90,
        transformOrigin: "50% 0%",
        display: "none",
        duration: 0.7,
        ease: "none"
      })
      gsap.to(arrow.current, { rotate: 180, duration: 1 })
    }
  }, [open])

  console.log("dropdown items: ", items)

  return (
    <div className={styles.dropdowncontainer}>
      <div className={styles.dropdowntitle} onClick={handleClick}>
        <h5>{title}</h5>
        <div ref={arrow} className={styles.arrow}>
          <Image src="/curve-arrow.svg" width="15" height="20" />
        </div>
      </div>
      <div className={styles.dropdown} ref={dropdown}>
        <ul className={styles.dropdownitemslist} >
          {items.map((item) => (
            <li key={item?.name} className={styles.dropdownitem}>
              <Link href={`/mission/${encodeURIComponent(item?.name)}`} >
                {item?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
