import { client } from './index.js';

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
