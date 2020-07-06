import React from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../global/gloablState'

const Profile = () => {
    const [user, setUser] = useRecoilState(userAtom)
    return (
        <div>
            <h1>Profile</h1>
            {user.fullname &&
                <div className="fullname">
                    <h3>Full Name</h3>
                    <h5 >{user.fullname}</h5>
                </div>
            }
            {user.email &&
                <div className="email">
                    <h3>Email</h3>
                    <h5 >{user.email}</h5>
                </div>
            }
        </div>
    )
}

export default Profile
