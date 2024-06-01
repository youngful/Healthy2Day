import React, { useState } from 'react';
import styles from '../styles/signUp.module.css';
import InPut from '../components/registerInput'
import { useNavigate } from 'react-router-dom'; // Змінено імпорт

function SignIn() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleFirstNameChange = (value) => { // Змінилось
        setFirstName(value);
    };

    const handleLastNameChange = (value) => { // Змінилось
        setLastName(value);
    };

    const handleEmailChange = (value) => { // Змінилось
        setEmail(value);
    };

    const handlePasswordChange = (value) => { // Змінилось
        setPassword(value);
    };

    const handleConfirmPasswordChange = (value) => { // Змінилось
        setConfirmPassword(value);
    };

    const handleSignUpClick = async () => {
        const data = { firstName, lastName, email, password };
        console.log(data);


        try {
            const response = await fetch('http://localhost:3001/user/sign_up', {
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
            console.log('Success:', result);
            navigate('/signIn');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <a href='/signIn'><img className={styles.logo} src='/images/logo.svg' alt='Logo' /></a>

            <div className={styles.signUp_wrapper}>
                <img className={styles.sign_decoration} src='/images/signUp.svg' alt='Decoration' />
                <h2 className={styles.title}>SIGN IN</h2>

                <div className={styles.input_wrapper}>
                    <InPut type={'text'} name={'First Name'} placeholder={'Enter your first name'} value={firstName} onChange={handleFirstNameChange} />

                </div>
                <div className={styles.input_wrapper}>
                    <InPut type={'text'} name={'Last Name'} placeholder={'Enter your last name'} value={lastName} onChange={handleLastNameChange} />

                </div>
                <div className={styles.input_wrapper}>
                    <InPut type={'email'} name={'Email'} placeholder={'Enter your email'} value={email} onChange={handleEmailChange} />

                </div>
                <div className={styles.input_wrapper}>
                    <InPut type={'password'} name={'Password'} placeholder={'Enter your password'} value={password} onChange={handlePasswordChange} />

                </div>
                <div className={styles.input_wrapper}>
                    <InPut type={'password'} name={'Confirm Password'} placeholder={'Enter your password'} value={confirmPassword} onChange={handleConfirmPasswordChange} />

                </div>

                <button className={styles.logIn_btn} onClick={handleSignUpClick}>Sign Up</button>

                <p>Have already? <a className={styles.sign_link} href='/signIn'>Log in</a></p>
            </div>
        </div>
    );
}


export default SignIn;
