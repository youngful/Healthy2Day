import React from 'react';
import styles from './selectedItemProfile.module.css';

function Item({ item, onRemoveItem }) {

    const setName = () => {
        if (item.name.length > 40) {
            return item.name.substring(0, 40) + "...";
        } else {
            return item.name;
        }
    };

    return (
        <div className={styles.item}>
            <p className={styles.name}>{setName()}</p>

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
