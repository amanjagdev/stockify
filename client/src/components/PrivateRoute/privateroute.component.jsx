import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userAtom } from "../../global/gloablState";

import "./privateroute.styles.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useRecoilValue(userAtom);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
