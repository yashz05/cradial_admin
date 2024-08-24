import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { HomePage } from "./../../../models/home_page"
// import { ProductCategory } from "./../../../models/product-category"
import { EntityManager } from "typeorm"
import {
    Order
} from "@medusajs/medusa"

// export const GET = async (
//     req: MedusaRequest,
//     res: MedusaResponse
// ) => {
//     const manager: EntityManager = req.scope.resolve("manager")
//     const postRepo = manager.getRepository(HomePage)
//     // console.log("ok")
//     return res.json({
//         posts: await postRepo.find(),
//     })
//     // return res.json({
//     //     posts: "ok"
//     // })
// }


export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(Order)
    // console.log("ok")
    const id = req.body.id
    const value = req.body.status
    const n = await postRepo.findOne({
        where: {
            id: id,
        }

    })
    var result = null
    if (n != null) {
        // update
        result = await postRepo.update(id, {
            status: value
        })
    } else {
        result = "error"
    }
    return res.json({
        data: result

    })
    // return res.json({
    //     posts: "ok"
    // })
}