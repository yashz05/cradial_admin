import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { phone_thread } from "./../../../../models/phone_thread"

import { EntityManager } from "typeorm"
export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(phone_thread)
    // console.log("ok")
    const id = req.body.id
    const value = req.body.filename
    const n = await postRepo.findOne({
        where: {
            id: id,
        }

    })
    var result = null
    if (n != null) {
        // update
        result = await postRepo.update(id, {
            thread_name: req.body.thread_name != undefined ? req.body.thread_name : n.thread_name,
            thread_color: req.body.thread_color != undefined ? req.body.thread_color : n.thread_color,
            thread_qty: req.body.thread_qty != undefined ? req.body.thread_qty : n.thread_qty,
            thread_img: req.body.thread_img != undefined ? req.body.thread_img : n.thread_img

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

