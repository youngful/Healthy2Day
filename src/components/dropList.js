import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './droplist.module.css';

function Droplist({ options, onChange, value }) {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleOptionChange = (event) => {
    const newValue = event.target.value;
    const selectedOptionObject = options.find(option => option.name === newValue);
    setSelectedOption(newValue);
    onChange(selectedOptionObject);
  };

  return (
    <select
      value={selectedOption}
      onChange={handleOptionChange}
      className={styles.droplist}
    >
      {options.map((option) => (
        <option key={option.index} value={option.name}>{option.name}</option>
      ))}
    </select>
  );
}

Droplist.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Droplist;
