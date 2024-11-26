//@ts-nocheck
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_list } from "../../../../models/charms_list";
import { EntityManager } from "typeorm";

// GET endpoint to fetch all charms
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const charmRepo = manager.getRepository(charms_list);
        const results = await charmRepo.find();
        res.json({
            message: results,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// POST endpoint to create a new charm
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const charmRepo = manager.getRepository(charms_list);

        const { id, name, image, qty, active, order, parent_cat } = req.body;
        const newRecord = charmRepo.create({
          
            name: name.toString(),
            image: image.toString(),
            qty: parseInt(qty.toString()),
            active: active.toString() === 'true' ? true : false,
            order: parseInt(order.toString()),
            parent_cat: parent_cat.toString()
        });

        await charmRepo.save(newRecord);

        res.json({
            message: "Saved successfully",
            data: newRecord,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// PUT endpoint to update an existing charm
export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const charmRepo = manager.getRepository(charms_list);
        const { id, name, image, qty, active, order, parent_cat } = req.body;

        const existingRecord = await charmRepo.findOne({
            where: { id: parseInt(id.toString()) },
        });

        if (!existingRecord) {
            return res.status(404).json({
                message: "Not Found",
            });
        }

        await charmRepo.update(existingRecord.id, {
            name: name.toString(),
            image: image.toString(),
            qty: parseInt(qty.toString()),
            active: active.toString() === 'true' ? true : false,
            order: parseInt(order.toString()),
            parent_cat: parent_cat.toString()
        });

        res.json({
            message: "Update successful",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};


