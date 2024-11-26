//@ts-nocheck
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_list } from "../../../../../models/charms_list";
import { EntityManager } from "typeorm";


// DELETE endpoint to delete a charm
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const charmRepo = manager.getRepository(charms_list);
        const id = parseInt(req.body.id.toString());

        const existingRecord = await charmRepo.findOne({
            where: { id },
        });

        if (!existingRecord) {
            return res.status(404).json({
                message: "Not Found",
            });
        }

        await charmRepo.remove(existingRecord);

        res.json({
            message: "Delete successful",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};