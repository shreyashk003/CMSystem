import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Login({ setLoginStatus, setCitizen, setUserType, setCurrentPage,setauthority,authority,setcitizenID,setusername }) {
  const username = useRef("");
  const password = useRef("");
  const authorityname=useRef("PWD")
  //const [authority1,setAuthority]=useState(false)  

  const updateauthority=()=>{
    setauthority(authorityname.current.value)
  }
  
  const setcategory=(event)=>{
    if(event.key=="Enter"){
  if(event.target.value==="Authority"){
    setauthority(true)
    setauthority(authorityname.current.value)
  }
  else
  setauthority(false)
  }}
  const signup = () => {
    setCurrentPage("signup"); // Navigate to SignUp page
  };

  const authenticate = async () => {
    const username1 = username.current.value;
    const password1 = password.current.value;

    if (!username1 || !password1) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const payload = { username: username1 };
      const response = await axios.post("http://localhost:9000/api/getusername", payload);

      if (response.data && response.data.length > 0) {
        const user = response.data[0]; // Get the first matched user
        setCitizen(user); // Set the citizen data
        setusername(user.username)

        // Check for the correct usertype and password
        if (password1 === user.password) {
          setLoginStatus(true);
          setUserType(user.usertype); // Dynamically set user type

          // Alert based on user type
          if (user.usertype === "citizen") {
            alert("Welcome, citizen!");
            setcitizenID(user.citizenID)
            setUserType("Citizen")
          } else if (user.usertype === "Authority") {
            alert("Welcome, Authority!");
            setUserType("Authority")
          } else if (user.usertype === "admin") {
            alert("Welcome, admin!");
            setUserType("Admin")
          } else {
            alert("Unknown user type.");
          }
        } else {
          alert("Invalid password.");
        }
      } else {
        alert("User not found.");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const styles = {
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fff9f0', // Pale yellow background for consistency
    },
    loginBox: {
      width: '100%',
      maxWidth: '400px',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      border: '1px solid #ffcc80', // Light peach border for consistency
    },
    loginTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#ff8c00', // Bright orange for the title
    },
    loginInput: {
      padding: '12px',
      borderRadius: '5px',
      fontSize: '16px',
      border: '1px solid #ffcc80',
      marginBottom: '15px',
    },
    loginButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ff8c00', // Bright orange for the login button
      borderColor: '#ff8c00',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    signupButton: {
      width: '100%',
      padding: '12px',
      marginTop: '10px',
      backgroundColor: '#28a745', // Green for the signup button
      border: 'none',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.loginTitle}>CMS Login</h2>
        <input
        onChange={setcategory}
          ref={username}
          type="text"
          placeholder="Enter username"
          className="form-control mb-3"
          style={styles.loginInput}
        />
        <input
          ref={password}
          type="password"
          placeholder="Enter password"
          className="form-control mb-3"
          style={styles.loginInput}
        />
        {authority?
        <select ref={authorityname} onChange={updateauthority}>
          <option selected>
          CHOOSE BODY
          </option>
          <option>
          PWD
          </option>
          <option>
          HESCOM
          </option>
          <option>
          MNC
          </option>
        </select>:""} 
        <button  
        onClick={(event)=>authenticate(event)} style={styles.loginButton} >
          Login
        </button>
        <button onClick={signup} style={styles.signupButton}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
