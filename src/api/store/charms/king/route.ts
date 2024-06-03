import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { charms_list } from "../../../../models/charms_list";
import { charms_parent_cat } from "../../../../models/charm_parent_cat";
import { charms_sub_cat } from "../../../../models/charms_sub_cat";

import { EntityManager } from "typeorm";

// GET endpoint to fetch all charms
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const manager1: EntityManager = req.scope.resolve("manager");
        const charmRepo1 = manager1.getRepository(charms_list);
        const results = await charmRepo1.find();

        const manager2: EntityManager = req.scope.resolve("manager");
        const charmRepo2 = manager2.getRepository(charms_parent_cat);
        const results2 = await charmRepo2.find();

        const manager3: EntityManager = req.scope.resolve("manager");
        const charmRepo3 = manager3.getRepository(charms_sub_cat);
        const results3 = await charmRepo3.find();

        // Initialize an empty array to store the final result
        let finalResult = [];

        // Loop through the message2 array
        for (let i = 0; i < results2.length; i++) {
            const parentCat = results2[i];
            // Find subcategories related to the current parent category and sort them by order
            const relatedSubcats = results3.filter(subcat => subcat.parentId === parentCat.id);
            relatedSubcats.sort((a, b) => a.order - b.order);
            // Initialize an empty array to store categories for current parent category
            let categories = [];

            // Loop through the related subcategories
            for (let j = 0; j < relatedSubcats.length; j++) {
                const subcat = relatedSubcats[j];
                // Find charms related to the current subcategory
                const relatedCharms = results.filter(charm => charm.parent_cat === subcat.id);
                // Push category object to categories array
                categories.push({
                    category: subcat.name,
                    charms: relatedCharms.map(charm => ({
                        name: charm.name,
                        order: charm.order,
                        file: charm.image,
                        stock: charm.qty
                    }))
                });
            }

            // Push parent category object to finalResult array
            finalResult.push({
                _id: parentCat.name,
                categories: categories
            });
        }

        res.json(finalResult);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
