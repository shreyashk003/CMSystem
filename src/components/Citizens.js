import axios from 'axios';
import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Citizens() {
  const cid = useRef("");
  const cname = useRef("");
  const cellno = useRef("");
  const email = useRef("");
  const address = useRef("");
  const gender = useRef("");
  const age = useRef("");
  const username = useRef("");
  const password = useRef("");

  const register = async () => {
    const payload = {
      cid: cid.current.value,
      cname: cname.current.value,
      cellno: cellno.current.value,
      email: email.current.value,
      address: address.current.value,
      gender: gender.current.value,
      age: age.current.value,
    };
    const payload1 = {
      username: username.current.value,
      password: password.current.value,
      cid: cid.current.value,
      usertype: "citizen",
    };

    try {
      await axios.post("http://localhost:9000/api/AddCitizen", payload);
      alert("Citizen Inserted");
    } catch (err) {
      console.log(err);
    }

    try {
      await axios.post("http://localhost:9000/api/AddUser", payload1);
      alert("New User Added");
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "auto",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      backgroundColor: '#fff9f0',  // Soft pale yellow background
      color: '#333',  // Dark text for readability
      marginTop: "50px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#ff8c00",  // Bright orange for the title
      textAlign: "center",
      marginBottom: "20px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#ff8c00", // Bright orange for the button
      border: "none",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "bold",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    input: {
      padding: '12px',
      borderRadius: '5px',
      fontSize: '16px',
      border: '1px solid #ffcc80', // Light peach border
      marginBottom: '15px',
    },
    select: {
      padding: '12px',
      borderRadius: '5px',
      fontSize: '16px',
      border: '1px solid #ffcc80', // Light peach border for select
      marginBottom: '15px',
    },
  };

  return (
    <div className="container" style={styles.container}>
      <h2 style={styles.title}>Citizen Registration</h2>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-card-text me-2"></i>Citizen ID
          </label>
          <input type="text" ref={cid} className="form-control" placeholder="Citizen ID" style={styles.input} />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-person-fill me-2"></i>Citizen Name
          </label>
          <input type="text" ref={cname} className="form-control" placeholder="Citizen Name" style={styles.input} />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-telephone-fill me-2"></i>Citizen Number
          </label>
          <input type="text" ref={cellno} className="form-control" placeholder="Citizen Number" style={styles.input} />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-envelope-fill me-2"></i>Citizen Email
          </label>
          <input type="email" ref={email} className="form-control" placeholder="Citizen Email" style={styles.input} />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-house-door-fill me-2"></i>Citizen Address
          </label>
          <input type="text" ref={address} className="form-control" placeholder="Citizen Address" style={styles.input} />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-gender-ambiguous me-2"></i>Gender
          </label>
          <select ref={gender} className="form-select" style={styles.select}>
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-calendar2-date-fill me-2"></i>Age
          </label>
          <input type="number" ref={age} className="form-control" placeholder="Citizen Age" style={styles.input} />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-person-circle me-2"></i>Username
          </label>
          <input type="text" ref={username} className="form-control" placeholder="Citizen Username" style={styles.input} />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <i className="bi bi-lock-fill me-2"></i>Password
          </label>
          <input type="password" ref={password} className="form-control" placeholder="Citizen Password" style={styles.input} />
        </div>
        <div className="col-12">
          <button type="button" onClick={register} style={styles.button} className="btn btn-primary w-100">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Citizens;
