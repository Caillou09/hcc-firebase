import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FormInfo from './components/FormInfo';
import BoutonInfos from './components/BoutonInfos';

import firebase, { FirebaseContext } from './firebase'
import useAuth from './hooks/useAuth'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

function Root() {
  const user = useAuth()
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{user, firebase}}>
        <BoutonInfos></BoutonInfos>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route path="/informations" component={FormInfo}/>
        </Switch>

      </FirebaseContext.Provider>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>

    <Root/>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
