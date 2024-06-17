import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { phone_thread } from "./../../../models/phone_thread"

import { EntityManager } from "typeorm"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(phone_thread)
    // console.log("ok")
    return res.json({
        posts: await postRepo.find(),
    })
    // return res.json({
    //     posts: "ok"
    // })
}


