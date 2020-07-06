import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Axios from 'axios';

import { userAtom } from '../global/gloablState';

const SignUp = ({ history }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullName] = useState("")
    const [user, setUser] = useRecoilState(userAtom)

    const handleSignUp = () => {
        Axios.post(`${process.env.REACT_APP_API_URL}/api/signup`,
        {email,password,name:fullname})
        .then(res => {
            setUser(res.data);
            history.push('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="SignUp">
            <div className="left-bar">
                <img src={require("../assets/logo.png")} alt="logo" className="logo"/>
                <img className="art" src={require("../assets/art.png")} alt="" />
            </div>
            <div className="main-signup">
                <h1>SIGN UP</h1>
                <div className="signup-form">

                    <label htmlFor="email">email</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" value={fullname} onChange={(e) => setFullName(e.target.value)} />

                    <label htmlFor="pass">password</label>
                    <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button className="login" onClick={() => handleSignUp()}>Log In</button>
            </div>

        </div>
    )
}

export default SignUp
