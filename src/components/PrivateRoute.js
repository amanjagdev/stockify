import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from '../global/gloablState';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useRecoilValue(userAtom);

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            user ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;