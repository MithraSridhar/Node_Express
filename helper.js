import { client } from './index.js';
import bcrypt from "bcrypt";


export async function getAllProducts(req) {
  return await client.db("b52-products").collection("products").find(req.query).toArray();
}
export async function getProductById(id) {
  return await client.db("b52-products").collection("products").findOne({ id: id });
}
export async function deleteProductByID(id) {
  return await client.db("b52-products").collection("products").deleteOne({ id: id });
}
export async function addProducts(product) {
  return await client.db("b52-products").collection("products").insertOne(product);
}

export async function updateProducts(id,updatedProduct) {
  return await client.db("b52-products").collection("products").updateOne({id: id},{$set:updatedProduct});
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt)
  const hashedPassword = await bcrypt.hash(password,salt)
  console.log(hashedPassword);
  return hashedPassword
}

export async function createUser(username,hashedPassword) {  
  return await client.db("b52-products").collection("users").insertOne({username:username,password:hashedPassword});
}

export async function getUserByName(username) {
  return await client.db("b52-products").collection("users").findOne({ username: username });
}



