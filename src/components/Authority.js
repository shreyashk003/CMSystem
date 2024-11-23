import axios from "axios";
import React, { useEffect, useState } from "react";

function Authority({ authority }) {
  const [complaints, setComplaints] = useState([]);

  const UnderProcess = (complaintId) => {
    const payload = {
      cid: complaintId,
      status: "Under Process",
    };

    axios
      .post("http://localhost:9000/api/UnderProcess", payload)
      .then((response) => {
        if (response.status === 200) {
          setComplaints((prevComplaints) =>
            prevComplaints.map((complaint) =>
              complaint.cid === complaintId
                ? { ...complaint, Status: "Under Process" }
                : complaint
            )
          );
          alert(`Complaint ${complaintId} marked as Under Process`);
        }
      })
      .catch((error) =>
        console.error("Error marking as Under Process:", error)
      );
  };

  const Resolved = (complaintId) => {
    const payload = {
      cid: complaintId,
      status: "Resolved",
    };

    axios
      .post("http://localhost:9000/api/Resolved", payload)
      .then((response) => {
        if (response.status === 200) {
          setComplaints((prevComplaints) =>
            prevComplaints.map((complaint) =>
              complaint.cid === complaintId
                ? { ...complaint, Status: "Resolved" }
                : complaint
            )
          );
          alert(`Complaint ${complaintId} marked as Resolved`);
        }
      })
      .catch((error) => console.error("Error marking as Resolved:", error));
  };

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/getComplaints/" + authority)
      .then((response) => setComplaints(response.data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [complaints]);

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
    button: {
      margin: "5px",
      padding: "10px",
      backgroundColor: "#ff8c00",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Authority Complaints</h1>
      <ul style={styles.list}>
        {complaints.map((complaint) => (
          <li key={complaint.cid} style={styles.listItem}>
            <h3 style={styles.subHeader}>Complaint #{complaint.cid}</h3>
            <p>
              <strong>Description:</strong> {complaint.description}
            </p>
            <p>
              <strong>Category:</strong> {complaint.category}
            </p>
            <p>
              <strong>Location:</strong> {complaint.location}
            </p>
            <p>
              <strong>Date:</strong> {complaint.cdate}
            </p>
            <p>
              <strong>Status:</strong> {complaint.Status}
            </p>
            <div>
              <button
                onClick={() => UnderProcess(complaint.cid)}
                style={styles.button}
              >
                Under Process
              </button>
              <button
                onClick={() => Resolved(complaint.cid)}
                style={styles.button}
              >
                Resolved
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Authority;
