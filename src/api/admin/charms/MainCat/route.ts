import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa";

import { charms_parent_cat } from "../../../../models/charm_parent_cat";
import { EntityManager } from "typeorm";

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const postRepo = manager.getRepository(charms_parent_cat);
        const results = await postRepo.find();
        res.json({
            message: results,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const PUT = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const postRepo = manager.getRepository(charms_parent_cat);
        const results = await postRepo.findOne({
            where: {
                id: parseInt(req.query.id.toString()),
            },
        });
        if (results === null) {
            res.status(404).json({
                message: "Not Found",
            });
        } else {
            var up = await postRepo.update(results.id, {
                name: req.query.name.toString(),
                active: req.query.active === 'true'
            })
            res.json({
                message: up,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}


export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const postRepo = manager.getRepository(charms_parent_cat);
        const results = await postRepo.findOne({
            where: {
                name: req.query.name.toString(),
            },
        });
        if (results === null) {
            var up = await postRepo.save({
                name: req.query.name.toString(),
                active: req.query.active === 'true' // Assuming req.query.active is a string representation of a boolean value
            });
            res.json({
                message: "saved !",
            });

        } else {
            res.status(401).json({
                message: "already exists",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}