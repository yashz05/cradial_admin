import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_list } from "../../../../../models/charms_list";
import { EntityManager } from "typeorm";

// GET endpoint to fetch all charms
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const charmRepo = manager.getRepository(charms_list);
        const parentCat = req.query.parent_cat as string | undefined;
        const existingRecord = await charmRepo.find({
            where: { parent_cat: parseInt(req.query.parent_cat.toString()) },
        });
        res.json({
            message: existingRecord,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

