import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class HomePage extends BaseEntity {
    
    @Column({ type: "varchar" })
    title: string 

    @Column({ type: "varchar" })
    value: string


    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "homepage")
    }
}