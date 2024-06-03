import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import {

    Product as MedusaProduct,
} from "@medusajs/medusa"
import { table } from "console";

@Entity({name: 'charm_parent_cat',synchronize: false})
export class charms_parent_cat extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id: number;
    
    @Column({ nullable: true })
    name: string | null

    @Column({ nullable: false, default: false })
    active: boolean | false

}