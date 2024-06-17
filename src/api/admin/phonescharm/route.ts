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


// update new thread    

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(phone_thread)
    // postRepo.insert({
    //     thread_name: req.body.thread_name,
    //     thread_color: req.body.thread_color,
    //     thread_qty: req.body.thread_qty,
    //     thread_img: req.body.thread_img
    // })
    var result = null
    const post = postRepo.create()
    post.thread_name = req.body.thread_name
    post.thread_color = req.body.thread_color
    post.thread_qty = req.body.thread_qty
    post.thread_img = req.body.thread_img
    // const
    result = await postRepo.save(post)
  

    return res.json({
        data: result

    })
    // return res.json({
    //     posts: "ok"
    // })
}


// update new thread    

export const DELETE = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(phone_thread)
    // postRepo.insert({
    //     thread_name: req.body.thread_name,
    //     thread_color: req.body.thread_color,
    //     thread_qty: req.body.thread_qty,
    //     thread_img: req.body.thread_img
    // })
    var result = null
    const post = postRepo.create()
    post.thread_name = req.body.thread_name
    post.thread_color = req.body.thread_color
    post.thread_qty = req.body.thread_qty
    post.thread_img = req.body.thread_img
    // const
    result = await postRepo.save(post)
  

    return res.json({
        data: result

    })
    // return res.json({
    //     posts: "ok"
    // })
}