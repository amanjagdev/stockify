import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Importing Pages
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import PrivateRoute from './components/PrivateRoute'


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
  )
}

export default App
