import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './registerInput.module.css';

function RegisterInput({ name, type, placeholder, onChange }) {
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value);
    };

    return (
        <div className={styles.input_container}>
            <label className={styles.label_name}>{name}</label>
            <input
                type={inputType}
                placeholder={placeholder}
                className={styles.register_input}
                onChange={handleChange}
            />
            {type === 'password' && (
                <img
                    src={inputType === 'password' ? '/small_icons/unvisible_password.svg' : '/small_icons/visible_password.svg'}
                    alt="password icon"
                    className={styles.password_icon}
                    onClick={togglePasswordVisibility}
                />
            )}
        </div>
    );
}

RegisterInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default RegisterInput;
