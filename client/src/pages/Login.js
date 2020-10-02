import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Axios from 'axios';

import { userAtom } from '../global/gloablState';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useRecoilState(userAtom);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      document.getElementById('pass').setAttribute('type', 'password');
    } else {
      document.getElementById('pass').setAttribute('type', 'text');
    }
  };

  const handleLogin = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/api/signin`, { email, password })
      .then((res) => {
        if (res.data.error) {
          setErrors([{ msg: res.data.error }]);
        } else {
          localStorage.setItem('user', JSON.stringify(res.data));
          setUser(res.data);
          history.push('/dashboard');
        }
      })
      .catch((err) => {
        if (Array.isArray(err.response.data.errors)) {
          setErrors(err.response.data.errors);
        } else {
          setErrors([{ msg: err.response.data.error }]);
        }
      });
  };

  return (
    <div className='Login'>
      <div className='left-bar'>
        <img src={require('../assets/logo.png')} alt='logo' className='logo' />
        <img className='art' src={require('../assets/art.png')} alt='' />
      </div>
      <div className='main-login'>
        <h1>LOGIN</h1>
        <div className='login-form'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            className='input-field'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='pass'>Password</label>
          <div className='input-icons'>
            <input
              type='password'
              id='pass'
              value={password}
              className='input-field'
              onChange={(e) => setPassword(e.target.value)}
            />

            {!showPassword ? (
              <svg
                className='w-2 h-2 icon'
                fill='none'
                onClick={handleShowPassword}
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                ></path>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                ></path>
              </svg>
            ) : (
              <svg
                className='w-2 h-2 icon'
                onClick={handleShowPassword}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                />
              </svg>
            )}
          </div>
        </div>
        <button className='login rev' onClick={() => handleLogin()}>
          Log In
        </button>
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

export default Login;
