import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../global/gloablState'
import Axios from 'axios'

const Profile = () => {
    const [user, setUser] = useRecoilState(userAtom)

    const [name, setName] = useState(user.user.name)
    const [email, setEmail] = useState(user.user.email)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [errors, setErrors] = useState(null)

    const handleSaveUser = () => {
        Axios.post(`${process.env.REACT_APP_API_URL}/api/update`,
            { name, email, password: newPassword, currentPassword },
            {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            .then(res => {
                setErrors(null)
                localStorage.setItem('user', JSON.stringify(res.data))
                setUser({
                    token : user.token,
                    user: res.data
                });
            })
            .catch(err => {
                if (Array.isArray(err.response.data.errors)) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors([{ msg: err.response.data.error }]);
                }
            });
    }

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <div className="container">
                <div className="static">
                    {user.user.name &&
                        <div className="fullname">
                            <h3>Full Name</h3>
                            <h5 >{user.user.name}</h5>
                        </div>
                    }
                    {user.user.email &&
                        <div className="email">
                            <h3>Email</h3>
                            <h5 >{user.user.email}</h5>
                        </div>
                    }
                    <div className="spacer"></div>
                </div>
                <div className="edit-details">
                    <h3>Edit Details</h3>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="text" id="email" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    <label htmlFor="email">New Password</label>
                    <input type="text" id="email" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button className="save rev" onClick={() => handleSaveUser()}>Save</button>
                    {
                        errors && errors.map(({ msg }, index) => <div key={index} className="error">{msg}</div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
