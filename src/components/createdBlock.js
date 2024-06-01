import React, { useState, useEffect } from 'react';
import styles from './createdBlock.module.css';

function SavedBlock({ user, items }) {
    const [savedDishes, setSavedDishes] = useState([]);

    useEffect(() => {
        if (user && user.savedDishes) {
            setSavedDishes(user.savedDishes.map(dish => dish._id));
        }
    }, [user]);

    const setName = (i) => {
        if (i.name.length > 20) {
            return i.name.substring(0, 17) + "...";
        } else {
            return i.name;
        }
    };

    const handleCreatedDish = async (dishId) => {
        const data = { dishId };

        try {
            let response = await fetch('http://localhost:3001/user/remove_created_dish', {
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

            if (savedDishes.includes(dishId)) {
                setSavedDishes(savedDishes.filter(savedId => savedId !== dishId));
            } else {
                setSavedDishes([...savedDishes, dishId]);
            }
            
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            {items.map((i) => (
                <div key={i._id} className={styles.item_wrapper}>
                    <div className={styles.item_info}>
                        <h3 className={styles.item_title}>{setName(i)}</h3>
                        <p className={styles.item_ingradients}>
                            {i.goods.map((g) => g.name).join(', ')}.
                        </p>
                        <button 
                            className={styles.delete_btn} 
                            onClick={() => handleCreatedDish(i._id)}
                        >
                            DELETE
                        </button>
                    </div>
                    <div className={styles.item_properties}>
                        <div className={styles.item_weight_kcal}>
                            <span className={styles.item_weight}>{`${Math.round(i.weight)} g`}</span>
                            <span className={styles.item_kcal}>{`${Math.round(i.sumKcal)} kcal`}</span>
                        </div>
                        <div className={styles.item_result}>
                            <div className={styles.result_group}>
                                <p>Protein:</p>
                                <span className={styles.result_percentage}>28%</span>
                            </div>
                            <div className={styles.result_group}>
                                <p>Carbohydrate:</p>
                                <span className={styles.result_percentage}>51%</span>
                            </div>
                            <div className={styles.result_group}>
                                <p>Lipid:</p>
                                <span className={styles.result_percentage}>14%</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SavedBlock;
