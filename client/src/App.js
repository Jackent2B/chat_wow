import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';

import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Login';
import Signup from './components/screens/Signup';
import UserProfile from './components/screens/UserProfile';
import CreatePost from './components/screens/CreatePost';
import FollowingUsersPost from './components/screens/FollowingUsersPost';
import { reducer, initialstate } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    //JSON.parse() is used to convert string to object
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
      //history.push('/');
    } else history.push('/signin');
  }, []);

  return (
    <div>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/createPost'>
        <CreatePost />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route path='/signin'>
        <Signin />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile />
      </Route>
      <Route path='/followingPost'>
        <FollowingUsersPost />
      </Route>
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
};
export default App;
