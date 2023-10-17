require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.cx0yex7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB database");

    const database = client.db("users");
    const userCollection = database.collection("user");


    // app.post('/adduser', async (req, res) => {
    //   try {
    //     const userData = req.body;
    //     const result = await userCollection.insertOne(userData);
    //     res.json(result);
    //   } catch (error) {
    //     console.error('Error adding user:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    //   }
    // });

    // app.get('/viewusers', async (req, res) => {
    //     try {
    //         const users = await userCollection.find({}).sort({ _id: -1 }).toArray();
    //       res.json(users);
    //     } catch (error) {
    //       console.error('Error fetching users:', error);
    //       res.status(500).json({ error: 'Internal server error' });
    //     }
    //   });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
app.get('/', (req, res) => {
  res.send('EpicTechSpot server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

run().catch(console.dir);
