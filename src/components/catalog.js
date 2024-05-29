import React, { useState } from 'react';
import styles from './catalog.module.css';

function Catalog({ user, dishes }) {

    const [isSaved, setIsSaved] = useState(false);


    const handleSaveDish = async () => {
        const data = {};
        console.log(data);

        try {
            const response = await fetch('http://localhost:3001/user/save_dish', {
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

            setIsSaved(true);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <div>

            {
                dishes.map((d, d_index) => (
                    <div key={d_index} className={`${styles.dish_wrapper} ${d_index % 2 === 0 ? styles.dish_left : styles.dish_right}`}>
                        <div className={styles.dish_img}>
                            <img src={`/dishes/${d.img}`} alt='Dish Img' />
                        </div>

                        <div className={styles.dish_content}>
                            <div className={styles.title_group}>
                                <h3 className={styles.dish_title}>{d.name}</h3>
                                <img
                                    className={styles.save_btn}
                                    src={isSaved ? '/small_icons/saved.svg' : '/small_icons/save.svg'}
                                    onClick={handleSaveDish}
                                    alt='Save Button'
                                />
                            </div>

                            <div className={styles.dish_inner}>
                                <div className={styles.dish_ingradients}>
                                    {
                                        d.goods.map((g, g_index) => (
                                            <div key={g_index}>{g.name}</div>
                                        ))
                                    }
                                    <span className={styles.dish_kcal}>{Math.round(d.sumKcal)}</span>
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
                ))
            }
        </div>
    );
}

export default Catalog;
