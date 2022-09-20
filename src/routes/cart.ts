import { Router } from "express";
const routes = Router()
const cartItems = [
    {id:0, product:"Eggs", price: 3, quantity: 1},
    {id:1, product:"Bread", price: 2, quantity: 1},
    {id:2, product:"Apples", price: 1, quantity: 3},
    {id:3, product:"Soda", price: 2, quantity: 2}
]

let currentId = 4

routes.get("/cart-items/", (req, res) => {
  const maxPrice = Number.parseInt(req.query['maxPrice'] as string)
  const prefix = req.query['prefix']
  const pageSize = Number.parseInt(req.query['pageSize'] as string)

  let tempItems = cartItems

  if (maxPrice) {
    tempItems = tempItems.filter((item) => {
        return item.price <= maxPrice
    })
  }

  if (prefix) {
    tempItems = tempItems.filter((item) => {
        return item.product === prefix
    })
  }

//   if (pageSize) {
//     if (pageSize < tempItems.length) {
//         tempItems = tempItems.copyWithin(pageSize, 0);
//       }
//     }


  res.status(200);
  res.json(tempItems);
});

routes.get("/cart-items/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    const item = cartItems.find((item) => {
        return item.id === id;
    });

    if (item) {
        res.status(200)
        res.json(item)
    } else {
        res.sendStatus(404).send('ID Not Found')
        
    }
  
});

routes.post("/cart-items/", (req, res) => {
   let newItem = req.body;

   newItem.id = currentId;
   currentId++
   
   cartItems.push(newItem);

   res.status(201)
   res.json(newItem)
})

routes.put("/cart-items/:id", (req, res) => {
   let newItem = req.body;
   let id = Number.parseInt(req.params.id);

   let index = cartItems.findIndex((item) => {
    return item.id === id;
   });

   if (index >= 0) {
    newItem.id = id;

    cartItems.splice(index, 1, newItem)

    res.status(200);
    res.json(newItem);
   } else {
    res.status(404).send;
   }
   
})

routes.delete("/cart-items/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);

    const index = cartItems.findIndex((cartItems) => {
        return cartItems.id === id});
        if (index >= 0) {
            cartItems.splice(index, 1)
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    });



export default routes