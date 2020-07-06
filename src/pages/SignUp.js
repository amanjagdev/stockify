import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { userAtom } from '../global/gloablState';

const SignUp = ({history}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullName] = useState("")
    const [user, setUser] = useRecoilState(userAtom)

    const handleSinUp = () => {
        //TODO : signup method on api
        setUser({
            email,fullname
        })
        history.push('/dashboard')
    }

    return (
        <div className="SignUp">
            <div className="left-bar">

            </div>
            <div className="main-signup">
                <h1>SIGN UP</h1>
                <div className="login-form">

                    <label htmlFor="email">email</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" value={fullname} onChange={(e) => setFullName(e.target.value)} />

                    <label htmlFor="pass">password</label>
                    <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button className="login" onClick={() => handleSinUp()}>
                    Log In
            </button>
            </div>

        </div>
    )
}

export default SignUp
