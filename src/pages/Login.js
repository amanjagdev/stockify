import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { userAtom } from '../global/gloablState';

const Login = ({history}) => {

    const [email, setEmail] = useState("")
    const [user, setUser] = useRecoilState(userAtom)
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        setUser({
            email
        });
        history.push('/dashboard')
    }

    return (
        <div className="Login">
            <div className="left-bar">

            </div>
            <div className="main-login">
                <h1>LOGIN</h1>
                <div className="login-form">

                    <label htmlFor="email">email</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="pass">password</label>
                    <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button className="login" onClick={() => handleLogin()}>
                    Log In
            </button>
            </div>

        </div>
    )
}

export default Login
