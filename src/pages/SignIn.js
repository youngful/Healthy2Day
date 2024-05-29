import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Змінено імпорт
import styles from '../styles/signIn.module.css';
import InPut from '../components/registerInput';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogInClick = async () => {
    const data = { email, password };

    try {
      const response = await fetch('http://localhost:3001/user/log_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const token = result.token;
      document.cookie = `token=${token}; path=/`;

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <a href='/signIn'><img className={styles.logo} src='/images/logo.svg' alt='Logo' /></a>

      <div className={styles.signIn_wrapper}>
        <img className={styles.sign_decoration} src='/images/signIn.svg' alt='Decoration' />
        <h2 className={styles.title}>SIGN IN</h2>

        <InPut type={'email'} name={'Email'} placeholder={'Enter your email'} value={email} onChange={handleEmailChange} />
        <InPut type={'password'} name={'Password'} placeholder={'Enter your password'} value={password} onChange={handlePasswordChange} />

        <button className={styles.logIn_btn} onClick={handleLogInClick}>Log In</button>

        <p>First time? <a className={styles.sign_link} href='/signUp'>Sign up</a></p>
      </div>
    </div>
  );
}

export default SignIn;
