import React, { useEffect, useState } from 'react';
import styles from './catalog.module.css';

function Catalog({ user, dishes }) {
    const [savedDishes, setSavedDishes] = useState([]);

    useEffect(() => {
        if (user && user.savedDishes) {
            setSavedDishes(user.savedDishes.map(dish => dish._id));
        }
    }, [user]);

    const handleSaveDish = async (dishId) => {
        const data = { dishId };

        try {
            let response;
            if (savedDishes.includes(dishId)) {
                response = await fetch('http://localhost:3001/user/remove_saved_dish', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
            } else {
                response = await fetch('http://localhost:3001/user/save_dish', {
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
            {dishes.map((d, d_index) => (
                <div key={d_index} className={`${styles.dish_wrapper} ${d_index % 2 === 0 ? styles.dish_left : styles.dish_right}`}>
                    <div>
                        <img className={styles.dish_img} src={`/dishes/${d.img}`} alt='Dish Img' />
                    </div>

                    <div className={styles.dish_content}>
                        <div className={styles.title_group}>
                            <h3 className={styles.dish_title}>{d.name}</h3>
                            <img
                                key={d._id}
                                className={styles.save_btn}
                                src={savedDishes.includes(d._id) ? '/small_icons/saved.svg' : '/small_icons/save.svg'}
                                onClick={() => handleSaveDish(d._id)}
                                alt='Save Button'
                            />
                        </div>

                        <div className={styles.dish_inner}>
                            <div className={styles.dish_ingradients}>
                                <p className={styles.dish_goods}>
                                    {d.goods.map((g) => g.name).join(', ')}.
                                </p>
                                <div className={styles.dish_weight_kcal}>
                                    <span className={styles.dish_kcal}>{`${Math.round(d.sumKcal)} kcal`}</span>
                                    <span className={styles.dish_weight}>{`${Math.round(d.weight)} g`}</span>
                                </div>
                            </div>

                            <div className={styles.dish_properties}>
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
                </div>
            ))}
        </div>
    );
}

export default Catalog;
