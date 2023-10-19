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

    await client.connect();
    console.log("Connected to MongoDB database");

    const database = client.db("EagleTech");
    const products = database.collection("products");
    const curt = database.collection("curt");


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
    app.post('/addcurt', async (req, res) => {
      try {
        const cartdata = req.body;
        const result = await curt.insertOne(cartdata);
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
        const result = await products.find(query).toArray();
    
        res.json(result); 
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    });
    app.get('/addcurt', async (req, res) => {
      try {
      
        const result = await curt.find({}).toArray();
    
        res.json(result); 
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
        const result = await products.find(query).toArray();
    
        res.json(result); 
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    });
    app.delete('/productDetails/:id', async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id)
        const query = { _id: new ObjectId(id) };
        const result = await products.deleteOne(query);
    
        res.json(result); 
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    });
    app.delete('/deleteproduct/:id', async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id)
        const query = { _id: id};
        const result = await curt.deleteOne(query);
    
        res.json(result); 
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    });

    app.put('/productDetails/:id', async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id)
        const updatedata = req.body;
        const filter  = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateproduct = {
          $set: {
            product: updatedata.product,
            brand : updatedata.brand,
            type : updatedata.type,
            image : updatedata.image,
            price : updatedata.price,
            Rating : updatedata.Rating,
            description : updatedata.description
          },
        };
        const result = await products.updateOne(filter, updateproduct, options);
    
        res.json(result); 
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
