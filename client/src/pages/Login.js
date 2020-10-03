import React, { useState, memo } from 'react';
import { useRecoilState } from 'recoil';
import Axios from 'axios';

import { userAtom } from '../global/gloablState';

// components
import ActionButton from '../components/ActionButton';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useRecoilState(userAtom);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleLogin = () => {
    setProcessing(true);
    Axios.post(`${process.env.REACT_APP_API_URL}/api/signin`, {
      email,
      password,
    })
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
      })
      .finally(() => setProcessing(false));
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          onClick={() => handleLogin()}
          label='Log In'
          loading={processing}
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

export default memo(Login);
