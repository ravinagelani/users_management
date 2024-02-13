import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import Signup from './components/Signup';
import Register from './components/Register';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route>
              <Route path="/" element={<Signup />} />
              <Route path="/" element={<Register />} />
          </Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;

// import React, { useState } from "react";
// import logo from './logo.svg';
// import './App.css';

// import { Register } from "./Register";
// import Signup from "./components/Signup";

// function App() {
//   const [currentForm, setCurrentForm] = useState('signup');

//   const toggleForm = (formName) => {
//     setCurrentForm(formName);
//   }

//   return (
//     <div className="App">
//       {
//         currentForm === "signup" ? <Signup onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
//       }
//     </div>
//   );
// }

// export default App;