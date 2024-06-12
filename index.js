const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// middleware

app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.neywkpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const touristSpots = client.db('touristsSpots').collection('allTouristSpots');

    app.get('/addTouristSpot', async(req,res)=>{
      const cursor = touristSpots.find()
      const result = await cursor.toArray()
      res.send(result)
    })


    app.post('/addTouristSpot',async(req,res)=>{
      const newTouristSpot = req.body;
      console.log(newTouristSpot);
      const result = await touristSpots.insertOne(newTouristSpot);
      res.send(result)
    })


    app.get("/addTouristSpot/:email",async(req,res)=>{
      console.log(req.params.email);
      const result = await touristSpots.find({email:req.params.email}).toArray();
      res.send(result)
    })


    app.get("/singleProduct/:id",async(req,res)=>{
      console.log(req.params.id)
      const result = await touristSpots.findOne({_id: new ObjectId(req.params.id)})
      console.log(result)
      res.send(result)
    })

    // touristSpot,
    //         countryName,
    //         location,
    //         Description,
    //         imageURL,
    //         userName,
    //         email,
    //         seasonality,
    //         travelTime,
    //         totalVisitors,
    //         averageCost

    app.put("/updateSpots/:id",async(req,res)=>{
      console.log(req.params.id)
      const query = {_id: new ObjectId(req.params.id)};
      const data = {
        $set:{
          touristSpot : req.body.touristSpot,
          countryName : req.body.countryName,
          location : req.body.location,
          Description : req.body.Description,
          imageURL : req.body.imageURL,
          userName : req.body.userName,
          email : req.body.email,
          seasonality : req.body.seasonality,
          travelTime : req.body.travelTime,
          totalVisitors : req.body.totalVisitors,
          averageCost : req.body.averageCost,

        }
      }

      const result = await touristSpots.updateOne(query,data)
      console.log(result)
      res.send(result)

    })


    app.delete("/delete/:id",async(req,res)=>{
      const result =await touristSpots.deleteOne({
        _id: new ObjectId(req.params.id)
      })
      console.log(result)
      res.send(result)
    })



    // Send a ping to confirm a successful connection

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get('/',(req,res)=>{
    res.send('Coffee making server is running')

})

app.listen(port,()=>{
    console.log(`Coffee server is running on port ${port}`)
})