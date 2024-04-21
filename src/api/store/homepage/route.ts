import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { HomePage } from "./../../../models/home_page"
import { EntityManager } from "typeorm"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(HomePage)
    // console.log("ok")
    return res.json({
        posts: await postRepo.find(),
    })
    // return res.json({
    //     posts: "ok"
    // })
}