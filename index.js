const express= require("express");
const cors= require("cors");
const { ClientSession } = require("mongodb");
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app =express();
const port=process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

//DOT.ENV
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x29c4xy.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const coffeeCollection = client.db("coffeeDB").collection('coffeeCollection')

    app.post('/coffee',async(req,res)=>{
      const newCoffee=req.body
      console.log(newCoffee);
      const result= await coffeeCollection.insertOne(newCoffee)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



//get router
app.get('/',(req,res)=>{
    res.send("Coffee making server is running ")
})
app.listen(port,()=>{
    console.log(`Coffee Server is running on port:${port}`);
})