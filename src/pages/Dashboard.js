import React from 'react'
import { useRecoilValue } from 'recoil'

import { userAtom } from '../global/gloablState'

const Dashboard = () => {

    const user = useRecoilValue(userAtom);

    //TODO: log these valyes here
    
    return (
        <div>
            <h1>Dashboard</h1>

            <h3>Welcome {user.user.name && user.user.name}</h3>
        </div>
    )
}

export default Dashboard
