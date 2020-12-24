import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from './Dropdown.module.scss'


const Dropdown = ({openState, changeOpenState, className}) => {
    const router = useRouter();
    const wrapperRef = useRef(null);


    const useOutsideEvent = (ref, state) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (state == true) {
                    const burgerMenu = document.getElementById('burger-menu');
                    if (ref.current && !ref.current.contains(event.target) && event.target.id !== "burger-menu" && !burgerMenu.contains(event.target) ) {
                        changeOpenState(false);
                    }
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }, [state]);
    }

    useOutsideEvent(wrapperRef, openState)

    const handleClick = (e) => {
        e.preventDefault();
        console.log("router: ", e, e.target.id);
        router.push("/" + e.target.id);
    }


    return (
        <div className={styles.menuDropdown + " " + className} ref={wrapperRef}>
            <ul>
                <li onClick={handleClick} id="recent-launches">Recent Launches</li>
                <li onClick={handleClick} id="future-launches">Future Launches</li>
                <li onClick={handleClick} id="missions">Missions</li>
                <li onClick={handleClick} id="rockets-capsules">Rockets &amp; Capsules</li>
                <li onClick={handleClick} id="drone-ships">Drone Ships</li>
            </ul>
        </div>

    )
}

export default Dropdown;