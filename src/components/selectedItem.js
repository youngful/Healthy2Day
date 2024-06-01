import React, { useState } from 'react';
import styles from './selectedItem.module.css';

function Item({ item, onAmountChange, onRemoveItem }) {
    const [amount, setAmount] = useState(0);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        onAmountChange(item, value);
    };

    const setName = () => {
        if (item.name.length > 10) {
            return item.name.substring(0, 8) + "...";
        } else {
            return item.name;
        }
    };
    
    const calculateCalories = () => {
        if (item.type === "p") {
            return item.calories * amount;
        } else if (item.type === "g" || item.type === "ml") {
            return (item.calories * amount) / 100;
        }
        return 0;
    };

    return (
        <div className={styles.item}>
            <p className={styles.name}>{setName()}</p>

            <div className={styles.info_grams}>
                <label className={styles.label}>grams</label>
                <input
                    type="number"
                    placeholder="g"
                    className={styles.input_grams}
                    value={amount}
                    onChange={handleAmountChange}
                    min="0"
                    max="9999"
                />
            </div>

            <div className={styles.info_kcal}>
                <span className={styles.label}>kcal</span>
                <p className={styles.kcal}>{calculateCalories()}</p>
            </div>

            <img
                className={styles.remove_img}
                src='./small_icons/remove.svg'
                alt='Remove'
                onClick={() => onRemoveItem(item)}
            />
        </div>
    );
}

export default Item;
