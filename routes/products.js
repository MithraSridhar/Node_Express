import express  from 'express';
import { getAllProducts, getProductById, deleteProductByID, addProducts } from '../helper.js'


const router = express.Router(); //express router library




//get all products and search query(category, rating and multiple filter)
router.get("/products", async(req, res) => {
    const{category,rating} = req.query
    //console.log(category)
    console.log(req.query)
    
    //--------direct data
    // if(category){
    //   filteredProducts= filteredProducts.filter((pd)=>pd.category===category)
    // }
    // if(rating){
    //   filteredProducts= filteredProducts.filter((pd)=>pd.rating==rating)
                            //or 
      // filteredProducts= filteredProducts.filter((pd)=>pd.rating=== +rating)                      
  // let filteredProducts = product; //copy by reference => same address
    // } -----//
  
  //-------querying from MongoDB
  //db.products.find()
  if(req.query.rating){
    req.query.rating= +req.query.rating;
  }
  const product = await getAllProducts(req);
  res.send(product);
  })
  //get product by id
  router.get("/products/:id",async (req, res) => {
    const { id } = req.params;
    console.log(req.params, id);
  //--------direct data
    //filter will always retrun an array, so if we need only one object then we can use find
  //const product = product.filter((pd) => pd.id === id);
  //const product = product.find((pd) => pd.id === id);-----//
  
  
  //-------querying from MongoDB
  //db.products.findOne({id:"1"}
  
  const product = await getProductById(id)
  product? res.send(product): res.status(404).send("Product Not Found")
  })
  
  //delete product by id
  router.delete("/products/:id",async (req, res) => {
    const { id } = req.params;
    console.log(req.params, id);
    const product = await deleteProductByID(id)
    res.send(product);
  })
  
  //insert data
  router.post("/products",express.json(),async (req,res)=>{ //providing middleware as express.json
   // const newProducts = req.body
   // console.log(newProducts)
   
     //making few fields mandatory & validate
     const{name,poster,price,id,summary,category} = req.body
     console.log(name,poster,price)
     if(!name || typeof name !== 'string' || !poster ||typeof poster !== 'string' || !price ||typeof price !== 'string' ){
      return res.status(400).send({error:"Invalid or missing fields"})
     }
     const product = {name,poster,price, id,summary,category,createAt: new Date(),}
   try{
      const result = await addProducts(product)
      //res.send({success:true,message:"Product Added Successfully",insertedProdut:result.ops[0]})
      res.send({success:true,message:"Product Added Successfully"})
   }
   catch(err){
    console.log(err)
    return res.status(500).send({error:"Internal Server Error"})
   }
    
  })

 export const productRouter = router