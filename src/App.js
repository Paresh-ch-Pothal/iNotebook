
import './App.css';
import { useState } from 'react';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Loginweb from './component/Loginweb';
import Signupweb from './component/Signupweb';

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showalert={showalert} />
              </Route> 
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Loginweb showalert={showalert}/>
              </Route>
              <Route exact path="/signup">
                <Signupweb showalert={showalert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
