import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Complaints from './components/Complaints';
import Login from './components/Login';
import Citizens from './components/Citizens';
import Authority from './components/Authority';

function App() {
  const [loginStatus, setLoginStatus] = useState(false); // Track login status
  const [citizen, setCitizen] = useState(null); // Track citizen data
  const [userType, setUserType] = useState(""); // Track user type
  const [currentPage, setCurrentPage] = useState("login"); // Track current page view
  const [authority,setauthority]=useState("Authority")
  const [citizenID,setcitizenID]=useState(0)
  const [username,setusername]=useState("")

  return (
    <div className="App">
      {loginStatus ? 
        userType === "Authority" ? 
          <Authority authority={authority} />
         : userType === "Citizen" ? 
          <Complaints authority={authority} citizenID={citizenID} username={username}  />
         : null
       : currentPage === "signup" ? 
        <Citizens />
       : 
        <Login
          setLoginStatus={setLoginStatus}
          setCitizen={setCitizen}
          setUserType={setUserType}
          setCurrentPage={setCurrentPage} // Pass setCurrentPage to Login component
          setauthority={setauthority}
          authority={authority}
          setcitizenID={setcitizenID}
          setusername={setusername}
        />
      }
    </div>
  );
}

export default App;
