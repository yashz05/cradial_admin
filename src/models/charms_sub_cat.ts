import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class charms_sub_cat extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ nullable: true })
    name: string | null

    @Column({ nullable: false })
    parentId: number

    @Column({ nullable: false })
    order: number

    @Column({ nullable: false, default: false })
    active: boolean | false

}