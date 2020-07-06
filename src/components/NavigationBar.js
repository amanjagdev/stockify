import React from 'react'
import { withRouter } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userAtom } from '../global/gloablState';

const NavigationBar = ({ history }) => {

    const [user,setUser] = useRecoilState(userAtom);

    const handleLogout = () => {
        setUser(null);
        history.push('/login');
    }

    return (
        <nav>
            <div className="nav-logo">
                <div className="logo" onClick={() => history.push('/')}>Stockify</div>
            </div>
            <div className="nav-links">

                {
                    user
                        ?
                        <React.Fragment>
                            <div className="nav-link" onClick={() => history.push('/dashboard')}>Dashboard</div>
                            <div className="nav-link" onClick={() => history.push('/profile')}>Profile</div>
                            <button onClick={() => handleLogout()}>Log Out</button>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <button onClick={() => history.push('/signup')}>Sign Up</button>
                            <button onClick={() => history.push('/login')}>Sign In</button>
                        </React.Fragment>
                }

            </div>
        </nav>
    )
}

export default withRouter(NavigationBar);
