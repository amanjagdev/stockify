import React from 'react'
import { useRecoilValue } from 'recoil'

import { userAtom } from '../global/gloablState'

const Dashboard = () => {
    const user = useRecoilValue(userAtom)
    return (
        <div>
            <h1>Dashboard</h1>
    <h3>Welcome {user.fullname && user.fullname}</h3>
        </div>
    )
}

export default Dashboard
