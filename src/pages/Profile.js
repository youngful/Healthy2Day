import React, { useEffect, useState } from 'react';
import Search from '../components/searchInput';
import InPut from '../components/registerInput';
import Item from '../components/selectedItemProfile';
import SavedBlock from '../components/savedBlock';
import CreatedBlock from '../components/createdBlock';
import styles from '../styles/profile.module.css';
import { useNavigate } from 'react-router-dom'; // Змінено імпорт
const apiUrl = process.env.REACT_APP_API_URL;



function Profile() {
    const [user, setUser] = useState(null);
    const [activeProfileItem, setActiveProfileItem] = useState('personal');
    const [addedItems, setAddedItems] = useState([]);
    const [imagePaths] = useState({
        personal: './small_icons/personalInfoActive.svg',
        saved: './small_icons/saved.svg',
        created: './small_icons/createdActive.svg',
        logOut: './small_icons/logOutActive.svg'
    });

    const showPersonalInfo = activeProfileItem === 'personal';
    const showSaved = activeProfileItem === 'saved';
    const showCreated = activeProfileItem === 'created';
    const showLogOut = activeProfileItem === 'logOut';
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${apiUrl}/user/get_user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const userData = await response.json();
                setUser(userData);
                console.log(userData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUser();
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        if (user) {
            if (user.firstName) {
                setFirstName(user.firstName);
            }
            if (user.lastName) {
                setLastName(user.lastName);
            }
            if (user.email) {
                setEmail(user.email);
            }
            if (user.age) {
                setAge(user.age);
            }
            if (user.height) {
                setHeight(user.height);
            }
            if (user.weight) {
                setWeight(user.weight);
            }
            if (user.alergic) {
                setAddedItems(user.alergic);
            }
        }
    }, [user]);

    const handleFirstNameChange = (value) => {
        setFirstName(value);
    };

    const handleLastNameChange = (value) => {
        setLastName(value);
    };

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handleAgeChange = (value) => {
        setAge(value);
    };

    const handleWeightChange = (value) => {
        setWeight(value);
    };

    const handleHeightChange = (value) => {
        setHeight(value);
    };

    const handleMenuClick = (menuItem) => {
        setActiveProfileItem(menuItem);
    };

    const handleAddItem = (item) => {
        setAddedItems([...addedItems, { ...item }]);
    };

    const handleRemoveItem = (item) => {
        const newItems = addedItems.filter((i) => i._id !== item._id);
        setAddedItems(newItems);
    };

    const handleMakeChanges = async () => {
        const data = { firstName, lastName, age, height, weight, email, alergics: addedItems };

        try {
            const response = await fetch(`${apiUrl}/user/update_profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
        }

    };

    const handleLogOut = async () => {
        try {
            const response = await fetch(`${apiUrl}/user/log_out`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            document.cookie = `token=; path=/`;
            navigate('/signIn');

        } catch (error) {
            console.error('Error:', error);
        }

    }
    return (
        <div className={styles.container}>
            {user && (
                <div className={styles.profile_wrapper}>
                    <div className={styles.profile_nav_wrapper}>
                        <div className={styles.profile_logo}>
                            <img className={styles.user_img} src='./team_icons/Marko.svg' alt='Avatar' />
                            <p className={styles.user_name}>{`${user.firstName} ${user.lastName}`}</p>
                        </div>

                        <div className={styles.profile_nav}>
                            <button className={`${styles.nav_item} ${activeProfileItem === 'personal' ? styles.activeItem : ''}`} onClick={() => handleMenuClick('personal')}>
                                <img className={styles.profile_img} src={activeProfileItem === 'personal' ? imagePaths.personal : './small_icons/personalInfo.svg'} alt='Nav Img' />
                                <span>Personal Information</span>
                            </button>

                            <button className={`${styles.nav_item} ${activeProfileItem === 'saved' ? styles.activeItem : ''}`} onClick={() => handleMenuClick('saved')}>
                                <img className={styles.profile_img} src={activeProfileItem === 'saved' ? imagePaths.saved : './small_icons/save.svg'} alt='Nav Img' />
                                <span>Saved</span>
                            </button>

                            <button className={`${styles.nav_item} ${activeProfileItem === 'created' ? styles.activeItem : ''}`} onClick={() => handleMenuClick('created')}>
                                <img className={styles.profile_img} src={activeProfileItem === 'created' ? imagePaths.created : './small_icons/created.svg'} alt='Nav Img' />
                                <span>Created</span>
                            </button>

                            <button className={`${styles.nav_item} ${activeProfileItem === 'logOut' ? styles.activeItem : ''}`} onClick={() => handleMenuClick('logOut')}>
                                <img className={styles.profile_img} src={activeProfileItem === 'logOut' ? imagePaths.logOut : './small_icons/logOut.svg'} alt='Nav Img' />
                                <span>Log Out</span>
                            </button>
                        </div>

                    </div>


                    <div className={styles.profile_content_wrapper}>
                        {showPersonalInfo && (
                            <div className={styles.personal_info_wrapper}>
                                <h2 className={styles.title}>PERSONAL INFORMATION</h2>
                                <div className={styles.personal_info_inner}>
                                    <div className={styles.personal_flName}>

                                        <div className={styles.input_wrapper}>
                                            <InPut value={firstName?.toString()} type='text' placeholder={user.firstName?.toString()} name='First Name' onChange={handleFirstNameChange} />
                                        </div>
                                        <div className={styles.input_wrapper}>
                                            <InPut value={lastName?.toString()} type='text' placeholder={user.lastName?.toString()} name='Last Name' onChange={handleLastNameChange} />
                                        </div>

                                    </div>

                                    <div className={styles.personal_properties}>

                                        <div className={styles.personal_inputs_group}>
                                            <div className={styles.input_wrapper}>
                                                <InPut value={email?.toString()} type='email' placeholder={user.email?.toString()} name='Email' onChange={handleEmailChange} />
                                            </div>
                                            <div className={styles.input_wrapper}>
                                                <InPut value={age?.toString()} type='text' placeholder={user.age?.toString()} name='Age' onChange={handleAgeChange} />
                                            </div>
                                            <div className={styles.input_wrapper}>
                                                <InPut value={height?.toString()} type='text' placeholder={user.height?.toString()} name='Height [cm]' onChange={handleHeightChange} />
                                            </div>
                                            <div className={styles.input_wrapper}>
                                                <InPut value={weight?.toString()} type='text' placeholder={user.weight?.toString()} name='Weight [kg]' onChange={handleWeightChange} />
                                            </div>
                                        </div>

                                        <div className={styles.personal_alergic}>
                                            <div className={styles.search_wrapper}>
                                                <Search onAddItem={handleAddItem} name={'Allergenic Products'} />
                                            </div>

                                            {addedItems && addedItems.length > 0 && (
                                                <div className={styles.alergics_wrapper}>
                                                    <div className={styles.alergics}>
                                                        {addedItems.map((item, index) => (
                                                            <div className={styles.item_wrapper} key={index}>
                                                                <Item
                                                                    item={item}
                                                                    onRemoveItem={handleRemoveItem}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {addedItems && addedItems.length === 0 && (
                                                <img className={styles.alergic_img} src='./images/alergic.svg' alt='Alergic Img' />
                                            )}
                                        </div>

                                    </div>

                                </div>

                                <button className={styles.make_changes} onClick={handleMakeChanges}>MAKE CHANGES</button>
                            </div>
                        )}
                        {showSaved && (
                            <div className={styles.saved_wrapper}>
                                <h2 className={styles.title}>SAVED <span className={styles.counter}>{user.savedDishes.length}</span></h2>
                                {user.savedDishes.length === 0 && (
                                    <div className={styles.noSaved_wrapper}>
                                        <p>Nothing has been added to SAVED yet</p>
                                        <img className={styles.noSaved_img} src='./images/nosaved.svg' alt='No Saved Img' />
                                    </div>

                                )}

                                {user.savedDishes.length > 0 && (
                                    <div className={styles.saved_inner}>
                                        <SavedBlock user={user} items={user.savedDishes} />
                                    </div>

                                )}
                            </div>
                        )}
                        {showCreated && (
                            <div className={styles.created_wrapper}>
                                <h2 className={styles.title}>CREATED <span className={styles.counter}>{user.createdDishes.length}</span></h2>
                                {user.createdDishes.length === 0 && (
                                    <div className={styles.noSaved_wrapper}>
                                        <p>Nothing has been created yet</p>
                                        <img className={styles.noSaved_img} src='./images/nocreated.svg' alt='No Created Img' />
                                    </div>

                                )}

                                {user.createdDishes.length > 0 && (
                                    <div className={styles.saved_inner}>
                                        <CreatedBlock user={user} items={user.createdDishes} />
                                    </div>

                                )}
                            </div>
                        )}
                        {showLogOut && (
                            <div className={styles.logOut_wrapper}>
                                <h2 className={styles.title}>LOG OUT</h2>
                                <div className={styles.logOut_inner}>
                                    <p className={styles.logOut_title}>Are you sure you want to log out?</p>
                                    <img className={styles.logOut_img} src='./images/log_out.svg' alt='No Created Img' />
                                </div>

                                <div className={styles.logOut_btn_group}>
                                    <button className={`${styles.logOut_btn} ${styles.logOut_yes}`} onClick={handleLogOut}>Yes</button>
                                    <a className={`${styles.logOut_btn} ${styles.logOut_no}`} href='/'>No</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
