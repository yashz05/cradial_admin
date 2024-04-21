import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    Tree,
    TreeChildren,
    TreeParent
} from "typeorm";
import {
    ProductCategory as MedusaProductCategory,
    Image
} from "@medusajs/medusa";


@Entity()
@Tree("materialized-path")
export class ProductCategory extends MedusaProductCategory {
    @Column({ type: "text", nullable: true })
    image: string | null;

    @TreeParent()
    @JoinColumn({ name: "parent_category_id" })
    // @ts-ignore
    parent_category: ProductCategory | null;

    @TreeChildren({ cascade: true })
    // @ts-ignore
    category_children: ProductCategory[];
}