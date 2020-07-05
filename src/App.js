import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Importing Pages
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';

const App = () => {
  return (
    <div>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
