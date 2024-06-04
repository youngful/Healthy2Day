import React, { useState, useEffect } from 'react';
import styles from './toggleSwitch.module.css';

function ToggleSwitch({ onChange, value }) {
  const [activeButton, setActiveButton] = useState(value);

  useEffect(() => {
    setActiveButton(value);
  }, [value]);

  const handleToggle = (button) => {
    setActiveButton(button);
    onChange(button === 'M' ? 'M' : 'W');
  };

  return (
    <div className={styles.switchContainer}>
      <div className={`${styles.background} ${activeButton === 'W' ? styles.woman : ''}`}></div>
      <button
        className={`${styles.btn} ${activeButton === 'M' ? styles.active_btn : ''}`}
        onClick={() => handleToggle('M')}
      >
        Man
      </button>
      <button
        className={`${styles.btn} ${activeButton === 'W' ? styles.active_btn : ''}`}
        onClick={() => handleToggle('W')}
      >
        Woman
      </button>
    </div>
  );
}

export default ToggleSwitch;
