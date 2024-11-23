import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../src/App.css";

function Complaints({ authority, citizenID, username }) {
  const [complaints, setComplaints] = useState([]);
  const cid = useRef("");
  const description = useRef("");
  const location = useRef("");
  const category = useRef("");
  const cdate = useRef("");

  // Function to add a new complaint
  const AddComplaint = () => {
    const cid1 = cid.current.value.trim();
    const description1 = description.current.value.trim();
    const location1 = location.current.value.trim();
    const category1 = category.current.value.trim();
    const cdate1 = cdate.current.value.trim();

    // Validate input fields
    if (!cid1 || !description1 || !location1 || !category1 || !cdate1) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      cid: cid1,
      description: description1,
      location: location1,
      category: category1,
      cdate: cdate1,
      Status: "Pending",
    };

    axios
      .post("http://localhost:9000/api/addComplaints", payload)
      .then((response) => {
        setComplaints((prevComplaints) => [...prevComplaints, payload]);
        cid.current.value = "";
        description.current.value = "";
        location.current.value = "";
        category.current.value = "";
        cdate.current.value = "";
      })
      .catch((error) => console.error("Error adding complaint:", error));
  };

  // Fetch complaints on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/getAllComplaints/${citizenID}`)
      .then((response) => setComplaints(response.data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [citizenID]);

  return (
    <div style={styles.page}>
      <h2 style={styles.header}>Complaints</h2>
      <h2>{username}</h2>
      <ul style={styles.list}>
        {complaints.map((complaint, index) => (
          <li key={index} style={styles.listItem}>
            <strong>ID:</strong> {complaint.cid} <br />
            <strong>Description:</strong> {complaint.description} <br />
            <strong>Location:</strong> {complaint.location} <br />
            <strong>Category:</strong> {complaint.category} <br />
            <strong>Date:</strong> {complaint.cdate} <br />
            <strong>Status:</strong> {complaint.Status} <br />
          </li>
        ))}
      </ul>

      <h3 style={styles.subHeader}>Add New Complaint</h3>
      <div style={styles.form}>
        <input
          type="text"
          ref={cid}
          placeholder="Complaint ID"
          style={styles.input}
        />
        <input
          type="text"
          ref={description}
          placeholder="Description"
          style={styles.input}
        />
        <input
          type="text"
          ref={location}
          placeholder="Location"
          style={styles.input}
        />
        <input
          type="text"
          ref={category}
          placeholder="Category"
          style={styles.input}
        />
        <input type="date" ref={cdate} style={styles.input} />
        <button onClick={AddComplaint} style={styles.button}>
          Add Complaint
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff9f0",
    padding: "30px",
    minHeight: "100vh",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#ff8c00",
    textAlign: "center",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    maxWidth: "700px",
    margin: "0 auto 30px",
  },
  listItem: {
    padding: "15px",
    backgroundColor: "#ffe4b5",
    borderRadius: "8px",
    border: "1px solid #ffcc80",
    marginBottom: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  subHeader: {
    fontSize: "22px",
    color: "#ff8c00",
    textAlign: "center",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ffcc80",
    fontSize: "16px",
    backgroundColor: "#ffffff",
  },
  button: {
    padding: "12px 0",
    backgroundColor: "#ff8c00",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    width: "100%",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Complaints;
