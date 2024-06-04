import React, { useState, useEffect } from 'react';
import styles from '../styles/nutrition.module.css';
import ToggleSwitch from '../components/toggleSwich';
import Slider from '../components/slider';
import Droplist from '../components/dropList';
const apiUrl = process.env.REACT_APP_API_URL;


function Nutration() {
  const [selectedActivity, setSelectedActivity] = useState({
    name: 'no physical exertion and sedentary work',
    index: 1
  });

  const [sex, setSex] = useState('M');
  const [age, setAge] = useState(61);
  const [weight, setWeight] = useState(100);
  const [height, setHeight] = useState(165);
  const [kcal, setKcal] = useState(2000);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isModified, setIsModified] = useState(false);


  useEffect(() => {
    if (isModified) {
      setIsSaved(false);
    }
  }, [isModified]);
  

  const options = [
    {
      name: 'no physical exertion and sedentary work',
      index: 1
    },
    {
      name: 'run or light gymnastics 1-3 times a week',
      index: 1.375
    },
    {
      name: 'do sports with medium loads 3-5 times a week',
      index: 1.55
    },
    {
      name: 'fully train 6-7 times a week',
      index: 1.725
    },
    {
      name: 'training with strength exercises 2 times a day',
      index: 1.9
    }
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/get_user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if(result.sex && result.age && result.weight && result.height && result.activityName && result.activityIndex && result.savedDialyRate.kcal){
          setSex(result.sex);
          setAge(result.age);
          setWeight(result.weight);
          setHeight(result.height);
          setSelectedActivity({
            name: result.activityName,
            index: result.activityIndex,
          });
          setKcal(Math.round(result.savedDialyRate.kcal));
          setIsSaved(true);
          setShowResults(true); 
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getUser();
  },[]);

  const handleSexChange = (newValue) => {
    setSex(newValue);
    setIsModified(true);
  };
  
  const handleAgeChange = (newValue) => {
    setAge(newValue);
    setIsModified(true);
  };
  
  const handleWeightChange = (newValue) => {
    setWeight(newValue);
    setIsModified(true);
  };
  
  const handleHeightChange = (newValue) => {
    setHeight(newValue);
    setIsModified(true);
  };
  
  const handleActivityChange = (selectedOption) => {
    setSelectedActivity(selectedOption);
    setIsModified(true);
  };
  

  const handleCalculateClick = () => {
    setShowResults(true);
    const calculatedKcal = calculateCalories(sex, weight, height, age, selectedActivity.index);
    setKcal(calculatedKcal);
  };

  const handleSaveResult = async () => {
    const data = { sex, age, weight, height, activity: selectedActivity };
    console.log(data);

    try {
      const response = await fetch(`${apiUrl}/user/setProperties`, {
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

  const calculateCalories = (sex, weight, height, age, activityLevel) => {
    let BMR;
    if (sex === 'M') {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const TDEE = BMR * activityLevel;
    return Math.round(TDEE);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CHECK YOUR <span className={styles.red_span}>DAILY RATE</span> TO EAT HEALTHY!</h1>

      <div className={styles.calc_group}>
        <div className={styles.calc_wrapper}>
          <div className={styles.buttonContainer}>
            <ToggleSwitch onChange={handleSexChange} value={sex}/>
          </div>

          <div className={styles.slider}>
            <Slider name={'Age'} min={0} max={120} onChange={handleAgeChange} value={age}/>
          </div>

          <div className={styles.slider}>
            <Slider name={'Weight [kg]'} min={0} max={180} onChange={handleWeightChange} value={weight}/>
          </div>

          <div className={styles.slider}>
            <Slider name={'Height [cm]'} min={0} max={280} onChange={handleHeightChange} value={height}/>
          </div>

          <div className={styles.drop_list}>
            <p>Activity:</p>
            <Droplist options={options} onChange={handleActivityChange} value={selectedActivity.name} />
          </div>

          <button className={styles.calculateButton} onClick={handleCalculateClick}>
            Calculate
          </button>
        </div>

        <div className={styles.calculationResults}>
          {!showResults ? (
            <div className={styles.img_wrapper}>
              <img src='/images/calc_wait_image.svg' alt='Waiting img' />
              <span className={styles.img_span}>Be productive and full of energy throughout the day!</span>
            </div>
          ) : (
            <div className={styles.result_block}>
              <div className={styles.result_title_wrapper}>
                <h3 className={styles.result_title}>RESULT</h3>
                <img 
                  className={styles.save_btn} 
                  src={isSaved ? '/small_icons/saved.svg' : '/small_icons/save.svg'} 
                  onClick={handleSaveResult}
                  alt='Save Button'
                />
              </div>

              <p className={styles.result_sub_title}>Your recommended daily rate:</p>

              <span className={styles.result_kcal}>{kcal} kcal</span>

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

              <div className={styles.result_group}>
                <p>Vitamin:</p>
                <span className={styles.result_percentage}>7%</span>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nutration;