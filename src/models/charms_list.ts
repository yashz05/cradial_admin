import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import {

    Product as MedusaProduct,
} from "@medusajs/medusa"

@Entity()
export class charms_list extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ nullable: true })
    name: string | null

    @Column({ nullable: false })
    image: string

    @Column({ nullable: false, default: 0 })
    qty: number | 0

    @Column({ nullable: false, default: false })
    active: boolean | false
    @Column({ nullable: false, default: 0 })
    order: number | 0
    @Column({ nullable: false, default: 0 })
    parent_cat: number | 0

}