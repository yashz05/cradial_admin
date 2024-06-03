import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_sub_cat } from "../../../../models/charms_sub_cat";
import { EntityManager } from "typeorm";

// GET endpoint to fetch all charms
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const charmRepo = manager.getRepository(charms_sub_cat);
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




