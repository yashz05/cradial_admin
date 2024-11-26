//@ts-nocheck
import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { phone_thread } from "./../../../../models/phone_thread"

import { EntityManager } from "typeorm"
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const charmRepo = manager.getRepository(phone_thread);
        const id = req.body.id.toString();

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