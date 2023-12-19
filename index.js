import express from "express" //inbuilt package
import { MongoClient } from "mongodb" //mongo client
import * as dotenv from "dotenv"
import cors from 'cors'
import { productRouter } from "./routes/products.js";

const app = express();
app.use(cors())
dotenv.config()
const PORT = process.env.PORT;

//req => what you send/ask to server
//res => what you receive from server

app.use(express.json())//interpreter //converting body to json


//connecting to MongoDB
// Connection URL
//const MONGO_URL ="mongodb://localhost:27017"
const MONGO_URL =process.env.MONGO_URL
console.log(MONGO_URL)

async function createConnection(){  
  const client = new MongoClient(MONGO_URL);
  client.connect();
  console.log("MONGODB conected")
 // console.log(client)
  return client;
}

export const client = await createConnection();



//default path
app.get("/", (req, res) => {
  res.send("Hello Everyone");
});

//express router
app.use("/products",productRouter)

app.listen(PORT, () => console.log("Server started in the port ", PORT)); //port number to listen


