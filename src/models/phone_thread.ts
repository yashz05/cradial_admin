import { 
    BeforeInsert, 
    Column, 
    Entity, 
    PrimaryColumn,
  } from "typeorm"
  import { BaseEntity } from "@medusajs/medusa"
  import { generateEntityId } from "@medusajs/medusa/dist/utils"
  
  @Entity()
  export class phone_thread extends BaseEntity {
    @Column({ type: "varchar" })
    thread_name: string | null 
    @Column({ type: "varchar" })
    thread_color: string | null
    @Column({ type: "varchar" })
    thread_qty: string | null 
    @Column({ type: "varchar" })
    thread_img: string | null
  
    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "post")
    }
  }