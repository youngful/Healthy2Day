import React from 'react';
import styles from '../styles/about.module.css';

function About() {

  let data = [
    {
      id: 1,
      image: '/team_icons/Marko.svg',
      name: 'Marko',
      skill: 'Back-end Developer',
      descr: 'Created the functionality of the project, ensured the confidentiality of user data.'
    },
    {
      id: 2,
      image: '/team_icons/Iryna.svg',
      name: 'Iryna',
      skill: 'UI|UX Designer',
      descr: 'Developed design of the website and created intuitive and comfortable  interface.'
    },
    {
      id: 3,
      image: '/team_icons/Vlad.svg',
      name: 'Vlad',
      skill: 'Front-end Developer',
      descr: 'The main goal is to create intuitive and efficient user interfaces.'
    },
    {
      id: 4,
      image: '/team_icons/Solomia.svg',
      name: 'Solomia',
      skill: 'System Analyst',
      descr: "Evaluate user needs and technical requirements to ensure the product's compatibility with the team's point of view.",
    },
    {
      id: 5,
      image: '/team_icons/Anastasia.svg',
      name: 'Anastasia',
      skill: 'Business Analyst',
      descr: "Analyze user needs and business requirements to ensure alignment between the product and the team's objectives.",
    }
  ];

  return (
    <div>
      <img className={styles.fruit_img_right} src='/images/Fruits_about_right.svg' alt='decoration bg' />
      <img className={styles.fruit_img_left} src='/images/Fruits_about_left.svg' alt='decoration bg' />

      <div className={styles.container}>
        <p className={styles.about_content}>
          We are a team of students working on a project to encourage a healthy lifestyle, particularly nutrition. Discover more about us and start eating healthy today!
        </p>

        <h1 className={styles.about_title}>
          Meet our team!
        </h1>

        <div className={styles.team_wrapper}>
          {
            data.map((d) => (
              <div key={d.id} className={styles.person_box}>
                <div>
                  <img className={styles.image} src={d.image} alt='Person Icon' />
                </div>

                <div>
                  <h3 className={styles.person_name}>Hi, I'm <span className={styles.red_span}>{d.name}</span>!</h3>
                </div>

                <div>
                  <h4 className={styles.person_skill}>{d.skill}</h4>
                </div>

                <div>
                  <p className={styles.person_descr}>{d.descr}</p>
                </div>
              </div>
            ))
          }
        </div>


        <h1 className={styles.about_title}>
          History of creation:
        </h1>

        <p className={styles.about_history}>
          Working on the idea of creating a project, our team concentrated on creating a useful and necessary product. We wanted to create an application that will help you follow a healthy diet every day to maintain a healthy body.
          <br/><br/>Therefore, when creating it, we focused on a list of tasty and low-calorie dishes that can be supplemented in the future. In addition, a calculator was developed to calculate the daily ration. It individually calculates the daily rate for each user, based on which you can make up your own ration during the day.
        </p>

        <span className={styles.year}> 2023 </span>
      </div>
    </div>
  );
}

export default About;
