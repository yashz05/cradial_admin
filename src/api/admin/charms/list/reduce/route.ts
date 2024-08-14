import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_list } from "../../../../../models/charms_list";
import { EntityManager } from "typeorm";


// PUT endpoint to update an existing charm
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager: EntityManager = req.scope.resolve("manager");
        const charmRepo = manager.getRepository(charms_list);
        const { id, name, image, qty, active, order, parent_cat } = req.body;
        console.log(req.body);

        const existingRecord = await charmRepo.findOne({
            where: { name: name },
        });

        if (!existingRecord) {
            return res.status(404).json({
                message: "Not Found",
            });
        }

        await charmRepo.update(existingRecord.id, {
            // name: name.toString(),
            // image: image.toString(),
            qty: parseInt(existingRecord.qty.toString()) - 1,
            // active: active.toString() === 'true' ? true : false,
            // order: parseInt(order.toString()),
            // parent_cat: parent_cat.toString()
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

