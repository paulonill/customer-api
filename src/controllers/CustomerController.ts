import { Request, Response } from "express";
import { prisma } from "../prisma";

class CustomerController {
    
    async create(req: Request, res: Response) {
        try {
            const { name , email, document } = req.body;
            const costumer = await prisma.customers.create({
                data: {
                    name,
                    document,
                    email
                }
            });
            return res.status(201).json(costumer);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }

    }

    update() {

    }

    delete() {

    }

    findAll() {

    }

    findById() {

    }
}