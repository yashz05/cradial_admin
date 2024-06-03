import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_sub_cat } from "../../../../models/charms_sub_cat";
import { EntityManager } from "typeorm";

// GET endpoint to fetch all charm sub-categories
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const subCatRepo = manager.getRepository(charms_sub_cat);
        const results = await subCatRepo.find();
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

// POST endpoint to create a new charm sub-category
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        console.log(req.body.name);

        const manager: EntityManager = req.scope.resolve("manager");
        const subCatRepo = manager.getRepository(charms_sub_cat);

        const existingRecord = await subCatRepo.findOne({
            where: {
                name: req.body.name.toString(),
            },
        });

        if (existingRecord) {
            return res.status(401).json({
                message: "Already exists",
            });
        }

        const newRecord = subCatRepo.save({
            name: req.body.name.toString(),
            parentId: parseInt(req.body.parentId.toString()),
            active: req.body.active.toString() === 'true' ? true : false
        });

        // await subCatRepo.save(newRecord);

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

// PUT endpoint to update an existing charm sub-category
export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
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

        await subCatRepo.update(existingRecord.id, {
            name: req.body.name.toString(),
            parentId: parseInt(req.body.parentId.toString()),
            active: req.body.active.toString() === 'true' ? true : false
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

// DELETE endpoint to delete a charm sub-category
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
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
