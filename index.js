require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const database = client.db("EagleTech");
    const products = database.collection("products");


    app.post('/addpost', async (req, res) => {
      try {
        const postdata = req.body;
        const result = await products.insertOne(postdata);
        res.json(result);
      } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server Error' });
      }
    });

    app.get('/addpost/:brand', async (req, res) => {
      try {
        const brand = req.params.brand;
        console.log(brand)
        const query = { brand: brand }; 
        const cursor = await products.find(query).toArray();
    
        res.json(cursor); 
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    });
    app.get('/productDetails/:id', async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id)
        const query = { _id: new ObjectId(id) };
        const cursor = await products.find(query).toArray();
    
        res.json(cursor); 
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    });
    
    

  } finally {

  }
}
app.get('/', (req, res) => {
  res.send('Eagle Tech server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

run().catch(console.dir);
