import React, { useEffect, useState } from 'react';
import Catalog from '../components/catalog'
// import styles from '../styles/breakfast.module.css';

function Breakfast() {
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/get_user', {
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

  useEffect(() => {
    const getBreakfast = async () => {
      try {
        const type = "breakfast";
        const response = await fetch(`http://localhost:3001/dish/get_dishes?type=${type}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const breakfastData = await response.json();
        setDishes(breakfastData);

        console.log(breakfastData);



      } catch (error) {
        console.error('Error:', error);
      }
    };

    getBreakfast();
  }, []);

  return (
    <div>
      <Catalog user={user} dishes={dishes} />
    </div>
  );
}

export default Breakfast;
