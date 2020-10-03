import React, { useState, memo } from 'react';
import Axios from 'axios';

// components
import ActionButton from '../components/ActionButton';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [errors, setErrors] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSignUp = () => {
    setProcessing(true);
    Axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, {
      email,
      password,
      name: fullname,
    })
      .then((res) => {
        history.push('/login');
      })
      .catch((err) => {
        if (Array.isArray(err.response.data.errors)) {
          setErrors(err.response.data.errors);
        } else {
          setErrors([{ msg: err.response.data.error }]);
        }
      })
      .finally(() => setProcessing(false));
  };

  return (
    <div className='SignUp'>
      <div className='left-bar'>
        <img src={require('../assets/logo.png')} alt='logo' className='logo' />
        <img className='art' src={require('../assets/art.png')} alt='' />
      </div>
      <div className='main-signup'>
        <h1>SIGN UP</h1>
        <div className='signup-form'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='fullname'>Full Name</label>
          <input
            type='text'
            id='fullname'
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor='pass'>Password</label>
          <input
            type='password'
            id='pass'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ActionButton
          className='login rev'
          onClick={() => handleSignUp()}
          loading={processing}
          label='Sign Up'
        />
        {errors &&
          errors.map(({ msg }, index) => (
            <div key={index} className='error'>
              {msg}
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(SignUp);
