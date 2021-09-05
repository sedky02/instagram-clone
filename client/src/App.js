import React from "react";
import './App.scss';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {
  const isDark = useSelector(state => state.darkReducer)
  return (
    <div  className={`App ${isDark? "dark-mode" : "light-mode"}`}>
      HELLO WORLD
      <Router>
        <Switch>
          {/* <Route path="/" exact component={Home}/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
