//@ts-nocheck
import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { HomePage } from "./../../../../models/home_page"
import { result } from "lodash"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const name = req.params.name
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(HomePage)
    return res.json({
        data: await postRepo.findOne({
            where: {
                title: name,
            },
        })

    })

}


export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const name = req.body.title
    const value = req.body.value
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(HomePage)
    const n = await postRepo.findOne({
        where: {
            title: name,
        }

    })
    var result = null
    if (n != null) {
        // update
        result = await postRepo.update(n.id, {
            title: name,
            value: value
        })
    } else {
        // insert
        const post = postRepo.create()
        post.title = name
        post.value = value
        result = await postRepo.save(post)

    }

    return res.json({
        data: result

    })

}