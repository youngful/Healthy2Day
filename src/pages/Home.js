import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/home.module.css';
import '../styles/slider.css';

function Home() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dotsClass: styles.slick_dots + ' slick-dots',
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };


  let data = [
    {
      image: '/types_meals/Breakfast.svg',
      title: 'BREAKFAST',
      amount: 5,
      more: '/breakfast'
    },
    {
      image: '/types_meals/Dinner.svg',
      title: 'DINNER',
      amount: 8,
      more: '/dinner'
    },
    {
      image: '/types_meals/Supper.svg',
      title: 'SUPPER',
      amount: 10,
      more: '/supper'
    },
    {
      image: '/types_meals/Dessert.svg',
      title: 'DESSERT',
      amount: 6,
      more: '/dessert'
    }
  ];

  return (
    <div className={styles.container}>
      <img className={styles.fruit_img} src='/images/Fruits.svg' alt='decoration bg'/>
      <div className={styles.title_wrapper}>
        <h1 className={styles.title}>EAT <span className={styles.red_span}>TASTY</span> & <span className={styles.red_span}>BE HEALTHY</span> EVERY DAY WITH US!</h1>
        <p className={styles.subtitle}>Delicious tasty healthy food that is useful for your body!</p>
      </div>


      <div className={styles.slick_container}>
        <h2 className={styles.slick_title}>Choose the type of meal that you would like to eat!</h2>
        <Slider {...settings}>
          {
            data.map((d, index) => (
              <div key={index} className={styles.slick_slide}>
                <div>
                  <img className={styles.image} src={d.image} alt='Meal Logo' />
                </div>

                <div>
                  <h3 className={styles.item_title}>{d.title}</h3>
                </div>

                <div>
                  <p className={styles.item_amount}>{d.amount} items</p>
                </div>

                <div className={styles.item_btn}>
                  <a href={d.more}>MORE</a>
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
    </div>
  );
}

export default Home;
