import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importing Pages
import SignUp from "./pages/SingUp/signup.component";
import Login from "./pages/Login/login.component";
import Profile from "./pages/Profile/profile.component";
import Dashboard from "./pages/Dashboard/dashboard.component";
import Home from "./pages/Home/home.component";

import NavigationBar from "./components/NavigationBar/navigationbar.component";
import Footer from "./components/Footer/footer.component";

import PrivateRoute from "./components/PrivateRoute/privateroute.component";

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
