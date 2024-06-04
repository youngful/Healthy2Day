import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './slider.module.css';

function Slider({ name, min, max, value: propValue, onChange }) {
    const [value, setValue] = useState(propValue);

    useEffect(() => {
        setValue(propValue); 
    }, [propValue]);

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value);
        setValue(newValue);
        onChange(newValue);
    };

    const handleInputChange = (event) => {
        const newValue = parseInt(event.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setValue(newValue);
            onChange(newValue);
        }
    };

    return (
        <div className={styles.sliderContainer}>
            <label className={styles.label_name}>{name}</label>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                className={styles.slider}
                onChange={handleChange}
            />
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                className={styles.valueDisplay}
                onChange={handleInputChange}
            />
        </div>
    );
}

Slider.propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Slider;
