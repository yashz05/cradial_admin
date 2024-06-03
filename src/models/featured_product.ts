import { Column, Entity } from "typeorm"
import {
   
    Product as MedusaProduct,
} from "@medusajs/medusa"

@Entity()
export class Product extends MedusaProduct {
    @Column({ default: false })
    featured: boolean

    @Column({ default: false })
    best_seller: boolean

}