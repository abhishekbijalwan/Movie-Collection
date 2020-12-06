import React, { useState } from 'react'
import Dashboard from './Components/Dashboard';
import Login from './Components/Login'

function App() {
  const [toggleComp, setToggleComp] = useState(false);

  function setToggleCompFunc(value) {
    setToggleComp(value)
  }
  
  console.log = console.warn = console.error = () => { };

  return (<>
    { toggleComp ? <Dashboard setToggleCompFunc={setToggleCompFunc} /> : <Login setToggleCompFunc={setToggleCompFunc} />}
  </>);
}

export default App;
