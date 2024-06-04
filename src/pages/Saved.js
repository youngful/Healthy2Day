import React, { useEffect, useState } from 'react';
import Catalog from '../components/catalog'
import styles from '../styles/saved.module.css';
const apiUrl = process.env.REACT_APP_API_URL;


function Saved() {
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([]);

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
        setDishes(userData.savedDishes);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    getUser();
  }, []);

  return (
    <div>
      {dishes.length > 0 && (
        <div>
          <Catalog user={user} dishes={dishes} />
        </div>
      )}

      {dishes.length === 0 && (
        <div className={styles.container}>
          <div className={styles.title_group}>
            <h1 className={styles.title}><span className={styles.red_span}>CREATE</span> YOUR <span className={styles.red_span}>HEALTHY MEALS</span> TO TASTE WITH PLEASURE!</h1>
            <p className={styles.sub_title}>Choose the food you like to eat and calculate its rate!</p>
          </div>

          <img className={styles.save_img} src='./images/save.svg' alt='No Saved'/>
        </div>
      )}
    </div>

  );

}

export default Saved;


