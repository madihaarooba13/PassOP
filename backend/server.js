const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')


dotenv.config()

const url = process.env.MONGO_URI
const client = new MongoClient(url);
client.connect();






// Database Name
const dbName = process.env.DB_NAME ;
const app = express()
const port = 3000
const cors = require("cors")
app.use(bodyparser.json())
app.use(cors())
 
// get all the password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
// Save the password
app.post('/', async (req, res) => {
  const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    // res.json(findResult) 
    res.send({success:true ,result:findResult})
})

app.put('/update', async (req, res) => {
  const { id, site, username, password } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const result = await collection.updateOne(
    { id },
    { $set: { site, username, password } }
  );

  res.send({ success: true, result });
});

// Delete the password
app.delete('/', async (req, res) => {
  const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    // res.json(findResult) 
    res.send({success:true ,result:findResult})
})
// 



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})





