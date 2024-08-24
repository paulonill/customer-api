import { Router } from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const routes = Router();

/*
 Model
    id String 
    name String
    email String
    document String
    createdAt Date now()
    updatedAt Date now()
*/

// GET POST PUT DELETE

routes.get("/customers", async (req, res) => {
    try {
        const customers = await prisma.customers.findMany();
        return res.json(customers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
});

routes.get("/customers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const costumer = await prisma.customers.findUnique({
            where: {id}
        });
    
        if (costumer == null) {
            return res.status(404).json();
        }
    
        return res.json(costumer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
});

routes.post("/customers", async (req, res) => {
    try {
        const { name, email, document } = req.body;
        const customer = await prisma.customers.create({
          data: {
              name,
              email,
              document
          }
        });
        return res.status(201).json(customer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
});

routes.delete("/customers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await prisma.customers.findUnique({
            where: {id}
        });
      
        if (customer == null) {
            return res.status(404).json();
        }
        await prisma.customers.delete({
            where: {id}
        });
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
});

routes.put("/customers/:id", async (req, res) =>{
   try {
       const id = req.params.id; 
       const {name, email, document} = req.body;
    
       const customer = await prisma.customers.findUnique({
           where: {id}
       });
    
       if (customer == null) {
           return res.status(404).json({msg: "Not found."});
       }
    
       const customerUpdated = await prisma.customers.update({
           where: {id},
           data: {
               name,
               email,
               document
           }
       });
       return res.json(customerUpdated);
   } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
   } 
    
});

export { routes }