import React, { useState } from 'react';
import Search from '../components/searchInput';
import styles from '../styles/create.module.css';
import Item from '../components/selectedItem';
const apiUrl = process.env.REACT_APP_API_URL;

function Create() {
    const [dishName, setDishName] = useState('');
    const [addedItems, setAddedItems] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);

    const handleAddItem = (item) => {
        setAddedItems([...addedItems, { ...item, amount: 0 }]);
    };

    const handleAmountChange = (item, amount) => {
        const newItems = addedItems.map((i) =>
            i._id === item._id ? { ...i, amount: Number(amount) } : i
        );
        setAddedItems(newItems);

        const newTotalWeight = newItems.reduce((acc, i) => acc + (i.amount || 0), 0);
        const newTotalCalories = newItems.reduce((acc, i) => {
            if (i.type === 'p') {
                return acc + (i.calories * (i.amount || 0));
            } else if (i.type === 'g' || i.type === 'ml') {
                return acc + (i.calories * (i.amount || 0)) / 100;
            }
            return acc;
        }, 0);

        setTotalWeight(newTotalWeight);
        setTotalCalories(newTotalCalories);
    };

    const handleRemoveItem = (item) => {
        const newItems = addedItems.filter((i) => i._id !== item._id);
        setAddedItems(newItems);

        const newTotalWeight = newItems.reduce((acc, i) => acc + (i.amount || 0), 0);
        const newTotalCalories = newItems.reduce((acc, i) => {
            if (i.type === 'p') {
                return acc + (i.calories * (i.amount || 0));
            } else if (i.type === 'g' || i.type === 'ml') {
                return acc + (i.calories * (i.amount || 0)) / 100;
            }
            return acc;
        }, 0);

        setTotalWeight(newTotalWeight);
        setTotalCalories(newTotalCalories);
    };

    const handleDishNameChange = (e) => {
        setDishName(e.target.value);
    };

    const handleCreate = () => {
        const dish = {
            name: dishName,
            type: 'userCreated',
            goods: addedItems.map(item => ({
                name: item.name,
                amount: item.amount
            })),
        };

        console.log(dish);
        

        if (dishName === '' || addedItems.length === 0 || totalCalories === 0 || totalWeight === 0) {
            console.log('Please fill in all required fields.');
        } else {
            fetch(`${apiUrl}/user/create_dish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dish),
                credentials: 'include'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setDishName('');
                    setAddedItems([]);
                    setTotalWeight(0);
                    setTotalCalories(0);
                })
                .catch(error => {
                    console.error('Error creating dish:', error);
                });
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.title_group}>
                <h1 className={styles.title}><span className={styles.red_span}>CREATE</span> YOUR <span className={styles.red_span}>HEALTHY MEALS</span> TO TASTE WITH PLEASURE!</h1>
                <p className={styles.sub_title}>Choose the food you like to eat and calculate its rate!</p>
            </div>

            <div className={styles.create_box}>
                <div className={styles.search_wrapper}>
                    <div className={styles.input_container}>
                        <label className={styles.label_name}>Name</label>
                        <input
                            placeholder="Enter your dish name"
                            className={styles.input_name}
                            value={dishName}
                            onChange={handleDishNameChange}
                        />
                    </div>

                    <Search onAddItem={handleAddItem} name={'Add items'}/>
                </div>

                {addedItems.length > 0 && (
                    <div className={styles.dish_properties}>
                        <div className={styles.ingradients}>
                            {addedItems.map((item) => (
                                <Item
                                    key={item._id}
                                    item={item}
                                    onAmountChange={handleAmountChange}
                                    onRemoveItem={handleRemoveItem}
                                />
                            ))}
                            <button className={styles.create_button} onClick={handleCreate}>Create</button>

                        </div>

                        <div className={styles.total_info}>
                            <h3 className={styles.total_title}>TOTAL</h3>
                            <div>
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

                            <div className={styles.dish_weight_kcal}>
                                <span className={styles.dish_kcal}>{Math.round(totalCalories)} kcal</span>
                                <span className={styles.dish_weight}>{Math.round(totalWeight)} g</span>
                            </div>
                        </div>
                    </div>
                )}

                {addedItems.length === 0 && (
                    <div className={styles.create_card}>
                        <img src="./images/create.svg" alt="Create" className={styles.create_image} />
                    </div>
                )}

            </div>
        </div>
    );

}

export default Create;
