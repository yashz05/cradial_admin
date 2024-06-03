import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_sub_cat } from "../../../../../models/charms_sub_cat";
import { EntityManager } from "typeorm";

// GET endpoint to fetch all charm sub-categories

// POST endpoint to create a new charm sub-category

// PUT endpoint to update an existing charm sub-category
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        // console.log(req.body);
        
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

        // await subCatRepo.update(existingRecord.id, {
        //     name: req.body.name.toString(),
        //     parentId: parseInt(req.body.parentId.toString()),
        //     active: req.body.active.toString() === 'true' ? true : false
        // });

        res.json({
            message: existingRecord
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};


