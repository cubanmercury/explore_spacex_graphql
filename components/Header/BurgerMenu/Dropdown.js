import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import styles from "./Dropdown.module.scss"

const Dropdown = ({
  openState,
  changeOpenState,
  className,
  setDropdownHeight,
}) => {
  const router = useRouter()
  const wrapperRef = useRef(null)

  useEffect(() => {
    setDropdownHeight(wrapperRef.current.getBoundingClientRect().height)
  }, [])

  const useOutsideEvent = (ref, state) => {
    // Handling close of dropdown on click outside of dropdown
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (state == true) {
          const burgerMenu = document.getElementById("burger-menu")
          if (
            ref.current &&
            !ref.current.contains(event.target) &&
            event.target.id !== "burger-menu" &&
            !burgerMenu.contains(event.target)
          ) {
            changeOpenState(false)
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [state])
  }

  useOutsideEvent(wrapperRef, openState)

  const handleClick = (e) => {
    e.preventDefault()
    changeOpenState(false)
    router.push("/" + e.target.id)
  }

  return (
    <div className={styles.menuDropdown + " " + className} ref={wrapperRef}>
      <ul>
        <li onClick={handleClick} id="recent-launches">
          Recent Launches
        </li>
        <li onClick={handleClick} id="future-launches">
          Future Launches
        </li>
        <li onClick={handleClick} id="missions">
          Missions
        </li>
        <li onClick={handleClick} id="rockets-capsules">
          Rockets &amp; Capsules
        </li>
        <li onClick={handleClick} id="drone-ships">
          Drone Ships
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
