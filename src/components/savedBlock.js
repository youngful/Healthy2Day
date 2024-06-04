import React, { useState, useEffect } from 'react';
import styles from './savedBlock.module.css';
const apiUrl = process.env.REACT_APP_API_URL;


function SavedBlock({ user, items }) {
    const [savedDishes, setSavedDishes] = useState([]);

    useEffect(() => {
        if (user && user.savedDishes) {
            setSavedDishes(user.savedDishes.map(dish => dish._id));
        }
    }, [user]);

    const setName = (i) => {
        if (i.name.length > 15) {
            return i.name.substring(0, 13) + "...";
        } else {
            return i.name;
        }
    };

    const handleSaveDish = async (dishId) => {
        const data = { dishId };

        try {
            let response;
            if (savedDishes.includes(dishId)) {
                response = await fetch(`${apiUrl}/user/remove_saved_dish`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
            } else {
                response = await fetch(`${apiUrl}/user/save_dish`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
            }

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
                    <img className={styles.item_img} src={`./dishes/${i.img}`} alt='Dish Img' />
                    <div className={styles.item_info}>
                        <div className={styles.title_group}>
                            <h3 className={styles.item_title}>{setName(i)}</h3>
                            <img
                                key={i._id}
                                className={styles.save_btn}
                                src={savedDishes.includes(i._id) ? '/small_icons/saved.svg' : '/small_icons/save.svg'}
                                onClick={() => handleSaveDish(i._id)}
                                alt='Save Button'
                            />
                        </div>

                        <p className={styles.item_ingradients}>
                            {i.goods.map((g) => g.name).join(', ')}.
                        </p>

                        <a href={`/${i.type}`} className={styles.more_btn}>MORE</a>
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
