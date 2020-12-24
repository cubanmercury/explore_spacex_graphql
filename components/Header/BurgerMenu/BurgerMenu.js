import { useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from "gsap";

import styles from './burgermenu.module.scss';

const BurgerMenu = ({menu, toggleMenu}) => {
    // Called on every component repaint (eg. after state updates)
    useEffect(() => {
        const burgerMenuElem = document.getElementById('burger-menu');
        if (menu === true){
            burgerMenuElem.style.transform = "rotate(90deg)";
            gsap.to(".rolldown", {y:262, duration: 0.25, ease: "none"});
        } 
        else{
            burgerMenuElem.style.transform = "rotate(0deg)";
            gsap.to(".rolldown", {y:0, duration: 0.5, ease: "none"});
        } 
    }, [menu]);

    const handleClick = (event) => {
        event.preventDefault();
        toggleMenu(event);
    }
    

    return (
        <>
            <a id="burger-menu" href="#" onClick={handleClick} className={styles.burgerMenu}>
                <Image src="/menu.svg" width="40" height="64" />
            </a>
        </>
    )
}

export default BurgerMenu;