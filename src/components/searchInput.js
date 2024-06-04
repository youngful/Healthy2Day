import React, { useState, useEffect, useCallback } from 'react';
import styles from './searchInput.module.css';
const apiUrl = process.env.REACT_APP_API_URL;


function GoodsSearch({ onAddItem, name }) {
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleSearch = useCallback(async (query) => {
        try {
            const response = await fetch(`${apiUrl}/goods/search?search=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data);
            setError(null);
        } catch (error) {
            setError('Error fetching search results');
            console.error('Error:', error);
        }
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            handleSearch(value);
        }, 300);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        if (searchInput) {
            handleSearch(searchInput);
        } else {
            setResults([]);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [searchInput, handleSearch, timeoutId]);

    const handleAddClick = (item) => {
        onAddItem(item);
        setSearchInput(''); 
        setResults([]); 
    };

    return (
        <div className={styles.input_container}>
            <label className={styles.label_name}>{name}</label>
            <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Choose the products you would like to add"
                className={styles.input_name}
            />

            <img className={styles.search_img} src='/small_icons/search.svg' alt='Search' />

            {error && <div>{error}</div>}

            {results.length > 0 && (
                <div className={styles.result_box_wrapper}>
                    <div className={styles.result_box}>
                        {results.map((item, index) => (
                            <div className={styles.result_item} key={index}>
                                <p className={styles.result_name}>{item.name}</p>
                                <img
                                    className={styles.add_img}
                                    src='./small_icons/add.svg'
                                    alt='Add'
                                    onClick={() => handleAddClick(item)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GoodsSearch;
