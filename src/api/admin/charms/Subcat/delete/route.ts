import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_sub_cat } from "../../../../../models/charms_sub_cat";
import { EntityManager } from "typeorm";

// GET endpoint to fetch all charm sub-categories

// DELETE endpoint to delete a charm sub-category
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const subCatRepo = manager.getRepository(charms_sub_cat);
        const id = parseInt(req.body.id.toString());

        const existingRecord = await subCatRepo.findOne({
            where: { id },
        });

        if (!existingRecord) {
            return res.status(404).json({
                message: "Not Found",
            });
        }

        await subCatRepo.remove(existingRecord);

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
