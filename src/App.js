import './App.css';

import Header from './components/Header'
import BoutonInfos from './components/BoutonInfos'

import firebase from './firebase'




function App() {

  return (

      <div className="App">
      <BoutonInfos></BoutonInfos>
        <header className="App-header">
          <Header></Header>
        </header>
      </div>

  );
}

export default App;
