import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import CreateDog from './components/CreateDog/CreateDog'
import Detail from './components/Detail/Detail'
import Navbar from './components/Navbar/Navbar';
import React from 'react'


function App() {  // Main file, here i define all the routes in my webapp, and the react components
  return (        // those routes will use
    <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <>
            <Navbar/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/dogs' component={CreateDog}/>
            <Route exact path='/dogs/:id' component={Detail}/>
          </>
        </Switch>
        <React.Fragment/>
        {/* <React.Fragment/> */} {/* React does not recognize the `computedMatch` prop on a DOM element. Este bug me tiraba si no ponia react fragment*/}
    </BrowserRouter>
  );
}

export default App;
