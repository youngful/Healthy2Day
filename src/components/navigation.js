import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navigation.module.css';

function Navigation() {
    const location = useLocation();
    const [activeNavItem, setActiveNavItem] = useState('');
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    useEffect(() => {
        const path = location.pathname;
        switch (path) {
            case '/':
                setActiveNavItem('home');
                break;
            case '/about':
                setActiveNavItem('about');
                break;
            case '/nutrition':
                setActiveNavItem('nutrition');
                break;
            case '/breakfast':
                setActiveNavItem('breakfast');
                break;
            case '/dinner':
                setActiveNavItem('dinner');
                break;
            case '/supper':
                setActiveNavItem('supper');
                break;
            case '/dessert':
                setActiveNavItem('dessert');
                break;
            case '/create':
                setActiveNavItem('create');
                break;
            case '/saved':
                setActiveNavItem('saved');
                break;
            case '/profile':
                setActiveNavItem('profile');
                break;
            default:
                setActiveNavItem('');
        }
    }, [location.pathname]);

    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    };

    return (
        <div>
            <nav className={styles.nav_menu}>
                <ul className={styles.nav_list}>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'home' ? styles.active_nav : ''}`}>
                        <Link to="/" onClick={() => setActiveNavItem('home')}>
                            <img src='/images/logo.svg' alt="logo" />
                        </Link>
                    </li>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'about' ? styles.active_nav : ''}`}>
                        <Link to="/about" onClick={() => setActiveNavItem('about')}>About us</Link>
                    </li>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'nutrition' ? styles.active_nav : ''}`}>
                        <Link to="/nutrition" onClick={() => setActiveNavItem('nutrition')}>Nutrition</Link>
                    </li>
                </ul>

                <ul className={styles.nav_list}>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'breakfast' ? styles.active_nav : ''}`}>
                        <Link to="/breakfast" onClick={() => setActiveNavItem('breakfast')}>Breakfast</Link>
                    </li>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'dinner' ? styles.active_nav : ''}`}>
                        <Link to="/dinner" onClick={() => setActiveNavItem('dinner')}>Dinner</Link>
                    </li>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'supper' ? styles.active_nav : ''}`}>
                        <Link to="/supper" onClick={() => setActiveNavItem('supper')}>Supper</Link>
                    </li>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'dessert' ? styles.active_nav : ''}`}>
                        <Link to="/dessert" onClick={() => setActiveNavItem('dessert')}>Dessert</Link>
                    </li>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'create' ? styles.active_nav : ''}`}>
                        <Link to="/create" onClick={() => setActiveNavItem('create')}>Create</Link>
                    </li>
                </ul>

                <ul className={styles.nav_list}>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'saved' ? styles.active_nav + ' ' + styles.active_saved : ''}`}>
                        <Link to="/saved" onClick={() => setActiveNavItem('saved')}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16675 34V8.84633C9.16675 8.00444 9.45841 7.29183 10.0417 6.7085C10.6251 6.12516 11.3377 5.8335 12.1796 5.8335H27.8205C28.6624 5.8335 29.375 6.12516 29.9583 6.7085C30.5417 7.29183 30.8333 8.00444 30.8333 8.84633V34L20 27.2692L9.16675 34ZM11.6667 29.9168L20 24.5L28.3334 29.9168V8.84633C28.3334 8.71811 28.28 8.60057 28.1731 8.49371C28.0663 8.38687 27.9487 8.33346 27.8205 8.33346H12.1796C12.0514 8.33346 11.9338 8.38687 11.827 8.49371C11.7201 8.60057 11.6667 8.71811 11.6667 8.84633V29.9168Z" fill="#9B9B9B" />
                            </svg>
                        </Link>
                    </li>
                    <li className={`${styles.nav_list_item} ${activeNavItem === 'profile' ? styles.active_nav + ' ' + styles.active_profile : ''}`}>
                        <Link to="/profile" onClick={() => setActiveNavItem('profile')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#9B9B9B"><path d="M480-492.72q-57.75 0-96.44-38.69t-38.69-96.56q0-57.88 38.69-96.44 38.69-38.56 96.44-38.56t96.44 38.56q38.69 38.56 38.69 96.44 0 57.87-38.69 96.56-38.69 38.69-96.44 38.69ZM180-187.69v-80.26q0-31.28 16.71-55.58 16.7-24.29 43.8-37.34 61.88-28.41 121.06-42.74 59.18-14.34 118.42-14.34t118.23 14.54q58.98 14.54 120.69 42.72 27.81 13.03 44.45 37.24Q780-299.23 780-267.95v80.26H180Zm50.26-50.26h499.48v-30q0-14.46-8.93-27.45-8.94-12.99-23.58-20.6-56.56-27.62-109.34-39.65-52.78-12.04-107.89-12.04t-108.43 12.04Q318.26-343.62 262.36-316q-14.64 7.61-23.37 20.6-8.73 12.99-8.73 27.45v30ZM480-542.97q35.97 0 60.42-24.45 24.45-24.45 24.45-60.43 0-35.97-24.45-60.42-24.45-24.45-60.42-24.45t-60.42 24.45q-24.45 24.45-24.45 60.42 0 35.98 24.45 60.43 24.45 24.45 60.42 24.45Zm0-84.88Zm0 389.9Z" /></svg>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={styles.burger_menu_icon} onClick={toggleBurgerMenu}>
                <div className={styles.burger_line}></div>
                <div className={styles.burger_line}></div>
                <div className={styles.burger_line}></div>
            </div>

            {isBurgerMenuOpen && (
                <nav className={styles.burger_menu}>
                    <ul className={styles.burger_nav_list}>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'home' ? styles.active_nav : ''}`}>
                            <Link to="/" onClick={() => { setActiveNavItem('home'); toggleBurgerMenu(); }}>Home</Link>
                        </li>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'about' ? styles.active_nav : ''}`}>
                            <Link to="/about" onClick={() => { setActiveNavItem('about'); toggleBurgerMenu(); }}>About us</Link>
                        </li>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'nutrition' ? styles.active_nav : ''}`}>
                            <Link to="/nutrition" onClick={() => { setActiveNavItem('nutrition'); toggleBurgerMenu(); }}>Nutrition</Link>
                        </li>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'breakfast' ? styles.active_nav : ''}`}>
                            <Link to="/breakfast" onClick={() => { setActiveNavItem('breakfast'); toggleBurgerMenu(); }}>Breakfast</Link>
                        </li>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'dinner' ? styles.active_nav : ''}`}>
                            <Link to="/dinner" onClick={() => { setActiveNavItem('dinner'); toggleBurgerMenu(); }}>Dinner</Link>
                        </li>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'supper' ? styles.active_nav : ''}`}>
                            <Link to="/supper" onClick={() => { setActiveNavItem('supper'); toggleBurgerMenu(); }}>Supper</Link>
                        </li>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'dessert' ? styles.active_nav : ''}`}>
                            <Link to="/dessert" onClick={() => { setActiveNavItem('dessert'); toggleBurgerMenu(); }}>Dessert</Link>
                        </li>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'saved' ? styles.active_nav : ''}`}>
                            <Link to="/saved" onClick={() => { setActiveNavItem('saved'); toggleBurgerMenu(); }}>Saved</Link>
                        </li>
                        <li className={`${styles.nav_list_item} ${activeNavItem === 'profile' ? styles.active_nav : ''}`}>
                            <Link to="/profile" onClick={() => { setActiveNavItem('profile'); toggleBurgerMenu(); }}>Profile</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default Navigation;
