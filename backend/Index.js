// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URI
const dbURI = 'mongodb://localhost:27017';
const dbName = 'ComplaintManagementSystem';
let LoginCollection=''
let complaintsCollection;
let CitizenCollection;

// Connect to MongoDB
MongoClient.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        const myDB = client.db(dbName);
        complaintsCollection = myDB.collection('Complaints');
        LoginCollection = myDB.collection('Login')
        CitizenCollection = myDB.collection('Citizens')

    })
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// GET API to fetch all complaints
app.get('/api/getAllComplaints/:citizenID', async (req, res) => {
    console.log(req.params.citizenID)
    let citizenID=parseInt(req.params.citizenID)
    try {
        const complaints = await complaintsCollection.find({citizenID:citizenID}).limit(3).toArray();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching complaints' });
    }
});

app.post('/api/UnderProcess', async (req, res) => {
    const { cid, status } = req.body
    try {
        const result = await complaintsCollection.updateOne(
            { cid: cid }, // Match the complaint by its ID
            { $set: { Status: status } } // Update the Status field
        );

    } catch (error) {
        console.error("Error updating complaint status:", error);
        res.status(500).send({ error: "Error updating complaint status" });
    }
});

app.post('/api/Resolved', async (req, res) => {
    const { cid, status } = req.body;
    try {
        const result = await complaintsCollection.updateOne(
            { cid: cid }, // Match the complaint by its ID
            { $set: { Status: status } } // Update the Status field
        );

    } catch (error) {
        console.error("Error updating complaint status:", error);
        res.status(500).send({ error: "Error updating complaint status" });
    }
});


app.get('/api/getComplaints/:authority', async (req, res) => {
    let authority=req.params.authority
    try {
        const complaints = await complaintsCollection.find({cbody:authority}).toArray();
        console.log(complaints)
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching complaints' });
    }
});

// Backend API
app.post('/api/getusername', async (req, res) => {
  try {
    const result = await LoginCollection.find({ username: req.body.username }).toArray();
    res.json(result); // Respond with JSON array directly
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});




app.post('/api/addComplaints', async (req, res) => {
    try {
        const newComplaint = req.body;

        // Insert complaint into the "Complaints" collection
        const result = await complaintsCollection.insertOne(newComplaint);
        
        res.status(200).json(result); // Respond with the inserted document
    } catch (error) {
        console.error('Error adding complaint:', error);
        res.status(500).json({ message: 'Failed to add complaint' });
    }
});


app.post('/api/AddCitizen', async (req, res) => {
    try {
        const newCitizen = req.body;

        // Insert complaint into the "Complaints" collection
        const result = await CitizenCollection.insertOne(newCitizen);
        
        res.status(200).json(result); // Respond with the inserted document
    } catch (error) {
        console.error('Error adding Citizen:', error);
        res.status(500).json({ message: 'Failed to add citizen' });
    }
});

app.post('/api/AddUser', async (req, res) => {
    try {
        const newuser = req.body;

        // Insert complaint into the "Complaints" collection
        const result = await LoginCollection.insertOne(newuser);
        
        res.status(200).json(result); // Respond with the inserted document
    } catch (error) {
        console.error('Error adding new User:', error);
        res.status(500).json({ message: 'Failed to add user' });
    }
});

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
