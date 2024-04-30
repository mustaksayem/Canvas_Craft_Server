const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const app = express();
const port = process.env.PORT || 5000


//middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wdpofk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    // await client.connect();

   const carftCollection = client.db('carftDB').collection('carfts');
   const subCategoryCollection = client.db("carftDB").collection("subcategory");
   
    app.get('/add',async(req,res)=>{
      const cursor = carftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/subCategory/:subcategory_Name', async (req, res) => {

      const result = await subCategoryCollection.find({ subcategory_Name: req.params.subcategory_Name }).toArray();
      res.send(result);

  });

    app.post('/add',async(req,res)=>{

      const newCarft = req.body;
      console.log(newCarft);
      const result = await carftCollection.insertOne(newCarft);
      res.send(result);

    })
    app.get("/myCrafts/:email", async (req, res) => {
      
      const result = await carftCollection.find({ email: req.params.email }).toArray();
      res.send(result)
    })
    app.get("/carftsDetails/:id", async (req, res) =>{
      
     const result =  await carftCollection.findOne({_id: new ObjectId(req.params.id), });
     res.send(result);
    })


    app.get("/categoryDetails/:id", async (req, res) =>{
      
     const result =  await subCategoryCollection.findOne({_id: new ObjectId(req.params.id), });
     res.send(result);
    })





    app.delete("/myCrafts/:id",async (req, res) =>{
      const result =  await carftCollection.deleteOne({_id: new ObjectId(req.params.id), });
      res.send(result);
    })

    app.put("/update/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) }
      const data = {
          $set: {
              price: req.body.price,
              rating:req.body.rating,
              item_name:req.body.item_name,
              subcategory_Name: req.body.subcategory_Name,
              short_description:req.body.short_description,
              image:req.body.image,
              processing_time:req.body.processing_time,
              customization:req.body.customization,
              stockStatus:req.body.stockStatus,
              
          }
      }
      const result = await carftCollection.updateOne(query,data)
      console.log(result);
      res.send(result)
  })

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);


app.get('/',(req, res)=>{
    res.send('CanvcasCarftHub server is running')
})

app.listen(port,()=>{
    console.log(`CanvcasCarftHub server is running on port ${port}`);
})
