import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './header.module.scss';
import BurgerMenu from "./BurgerMenu/BurgerMenu"
import Dropdown from './BurgerMenu/Dropdown'
import {gsap} from "gsap"

const Header = () =>  {
    const header = useRef(null)
    const [menu, setMenu] = useState(false);
    const [dropdownHeight, setDropdownHeight] = useState(0)
    const [headerHeight, setHeaderHeight] = useState(0)

    const toggleMenu = (event) => {
        event.preventDefault();
        setMenu(!menu);
    }
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push('/');
    }

    useEffect(() => {
        setHeaderHeight(header.current.getBoundingClientRect().height)
        menu ? gsap.fromTo(".rolldown", {y: 0}, {y: dropdownHeight, duration: 0.5, ease: "none"}) : gsap.fromTo(".rolldown", {y: dropdownHeight}, {y: 0, duration: 0.5})
    })

    return (
        <div className={styles.headercontainer}>
            <div className={styles.header} ref={header}>
                <BurgerMenu menu={menu} toggleMenu={event => toggleMenu(event)} />
                <Image src="/spacex.svg" width="240" height="64" onClick={handleClick} className={styles.logo} />
                <a href="https://api.spacex.land/graphql/">
                    <Image src="/graphql-icon.svg" width="40" height="64" />
                </a>
            </div>
            <Dropdown className="rolldown" openState={menu} changeOpenState={state => setMenu(state)} setDropdownHeight={height => setDropdownHeight(height)} />
        </div>
    )
}

export default Header;