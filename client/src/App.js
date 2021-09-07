import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import DogCards from './modules/dogCards/index';

function App() {
  return (
      <div className="App">
        Hola!
        <DogCards />
      </div>
  );
}

export default App;
