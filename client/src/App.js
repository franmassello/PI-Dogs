import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import CreateDog from './components/CreateDog/CreateDog'
import Detail from './components/Detail/Detail'
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <div className="App">
            <Navbar/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/dogs' component={CreateDog}/>
          <Route exact path='/dogs/:id' component={Detail}/>
          </div>
        </Switch>
      
    </BrowserRouter>
  );
}

export default App;
