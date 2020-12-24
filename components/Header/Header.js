import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from './header.module.scss';
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Dropdown from './BurgerMenu/Dropdown';

const Header = () =>  {
    const [menu, setMenu] = useState(false);

    const toggleMenu = (event) => {
        event.preventDefault();
        setMenu(!menu);
    }
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push('/');
    }

    return (
        <>
            <div className={styles.header}>
                <BurgerMenu menu={menu} toggleMenu={event => toggleMenu(event)} />
                <Image src="/spacex.svg" width="240" height="64" onClick={handleClick} className={styles.logo} />
                <a href="https://api.spacex.land/graphql/">
                    <Image src="/graphql-icon.svg" width="40" height="64" />
                </a>
            </div>
            <Dropdown className="rolldown" openState={menu} changeOpenState={state => setMenu(state)} />
        </>
    )
}

export default Header;