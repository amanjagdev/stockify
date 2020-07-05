import React from 'react'
import { withRouter } from 'react-router-dom';

const NavigationBar = ({ history }) => {
    return (
        <nav>
            <div className="nav-logo">
                <div className="logo" onClick={() => history.push('/')}>Stockify</div>
            </div>
            <div className="nav-links">
                <div className="nav-link" onClick={() => history.push('/dashboard')}>Dashboard</div>
                <div className="nav-link" onClick={() => history.push('/profile')}>Profile</div>
                <button>Sign Up</button>
            </div>
        </nav>
    )
}

export default withRouter(NavigationBar);
