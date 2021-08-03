// import logo from './logo.svg';
// import './App.css';
import React, { useEffect,createContext,useReducer,useContext} from 'react'
import {BrowserRouter,  Switch, Route, useHistory } from 'react-router-dom'

// import {Box} from '@material-ui/core'

// COmponents
import Header from './components/Header';
import Home from './components/Home/home';
import Signup from './components/auth/signup'
import Signu from './components/auth/signu'
// import Profile from './components/profile/profile';
import Profile  from './components/profile/profile'
import DetailView from './components/Detail/DetailView';
import ApplicationView from './components/Detail/Application';
import Messenger from './components/Messenger/Messenger';
import UserHome from './components/UserHome/UserHome';
// import {reducer,initialState} from './reducers/userReducer'
import CreatePost from './components/create/CreatePost'
import {reducer, initialState} from './reducers/userReducer'
import UpdateView from './components/create/UpdatePost';
import Followers from './components/Follow/Followers';
import Following from './components/Follow/Following';
// xport 
export const UserContext =  createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    
  },[])
  // 
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      
      <Route path="/details/:id">
        <DetailView/>
      </Route>
      <Route path="/signin">
      <Signu />
      </Route>
      <Route path="/signup">
      <Signup />
      </Route>
      <Route path="/profile/:id">
        <Profile />
      </Route>
      <Route path="/application/:id">
        <ApplicationView />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route exact path="/messenger/:id">
      {state ? <Messenger /> : <Signup/>}
      </Route>
      <Route path="/home">
      {state ? <UserHome/> : <Signup/>}
      </Route>
      <Route path="/update/:id">
      {state ? <UpdateView/> : <Signu/>}
      </Route>
      <Route path="/followers/:id">
        <Followers/>
      </Route>
      <Route path="/following/:id">
        <Following/>
      </Route>
      {/* <Route path="/signin">
        <Signin />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route> */}
      
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Header />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
