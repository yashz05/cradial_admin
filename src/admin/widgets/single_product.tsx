import type { WidgetConfig } from "@medusajs/admin";
import {
  Container,
  Heading,
  Switch,
  Label,
  useToggleState,
  Input,
  Button,
  Copy
} from "@medusajs/ui";
import e from "express";
import { useRef, useState, useEffect } from "react";
import {
  useAdminCreateVariant,
  useAdminUpdateVariant,
  useAdminDeleteVariant,
  useAdminUpdateProduct,
} from "medusa-react";

import type { ProductDetailsWidgetProps } from "@medusajs/admin";
import { log } from "console";

const single_product = ({ product, notify }: ProductDetailsWidgetProps) => {
  const [editOpen, showEdit, closeEdit, toggle] = useToggleState(true);
  const [price, setPrice] = useState(0);

  const [Salesprice, setSalesPrice] = useState(0);
  const [productcolor, setColor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (product.variants.length == 1) {
      showEdit();
      //   @ts-ignore
      setSalesPrice(product.metadata.sales_price ?? 0)
      //   @ts-ignore
      setColor(product.metadata.product_colors ?? '')

      //toggle()
      console.log(product.variants[0]);
      setPrice(product.variants[0].prices[0].amount / 100);
      setQuantity(product.variants[0].inventory_quantity);
    }
  }, [3000]);

  const createVariant = useAdminCreateVariant(product.id);
  const updatevariant = useAdminUpdateVariant(product.id);
  const delete_varaint = useAdminDeleteVariant(product.id);
  const updateProduct = useAdminUpdateProduct(
    product.id || ""
  )

  function delete_varaint_functino() {
    if (product.variants.length > 0) {
      setloading(true);
      delete_varaint.mutate(product.variants[0].id, {
        onSuccess: ({ variant_id, object, deleted, product }) => {
          notify.success("success", "Converted to Vairable Product!");
          setloading(false);
        },
      });
    }
  }
  const save_meta_data = () => {
    setloading(true);
    updateProduct.mutate({
      metadata: {
        sales_price: Salesprice,
        product_colors: productcolor
      },
    }, {
      onSuccess: ({ product }) => {
        console.log(product)
        setloading(false);
      }

    }
    )
  }
  function update_create_variant() {
    if (product.variants.length > 0) {
      setloading(true);
      updatevariant.mutate(
        {
          variant_id: product.variants[0].id,

          prices: [
            {
              amount: Number(price) * 100,
              currency_code: "inr",
            },
          ],
          inventory_quantity: quantity,
        },
        {
          onSuccess: ({ product }) => {
            notify.success("success", "Price  & Quantity has been Updated !");
            setloading(false);
          },
        }
      );
    } else {
      setloading(true);
      setloading(true);
      createVariant.mutate(
        {
          title: product.title,
          material: null,
          mid_code: null,
          hs_code: null,
          origin_country: null,
          sku: null,
          ean: null,
          upc: null,
          barcode: null,
          inventory_quantity: Number(quantity),
          manage_inventory: false,
          allow_backorder: false,
          weight: null,
          width: null,
          height: null,
          length: null,
          prices: [
            {
              amount: price * 100,
              currency_code: "inr",
            },
          ],
        },
        {
          onSuccess: ({ product }) => {
            notify.success("success", "Price  & Quantity has been set !");
            setloading(false);
          },
        }
      );
    }
    save_meta_data()
  }
  return (
    <div>
      <Container>
        <Heading level="h1">Single Product</Heading>
        <div className="flex items-center gap-x-2 mt-5">
          <Switch
            id="manage-inventory-small"
            size="small"
            checked={true}

          // defaultChecked={product.variants.length == 1 ? true : editOpen}
          // onCheckedChange={(vlue) => {
          //   //    editOpen ? closeEdit() : showEdit()
          //   //    console.log(editOpen);
          //   vlue == true ? showEdit() : closeEdit();
          //   if (vlue == false) {
          //     delete_varaint_functino();
          //   }
          // }}
          />
          <Label htmlFor="manage-inventory-small" size="small">
            Enable Single Product (No variants) for {product.title}
          </Label>
        </div>

        <div className="flex">
          <div className="w-28 m-4">
            <Label htmlFor="manage-inventory-small" size="small">
             Final Price
            </Label>
            {/* @ts-ignore */}
            <Input
              type="number"
              // @ts-ignore
              value={price}
              // @ts-ignore
              onInput={(e) => setPrice(parseInt(e.target.value))}
              placeholder={!editOpen ? "Disabled" : "Price"}
              id="disabled-input"
              disabled={!editOpen}
            />
          </div>

          <div className="w-28 m-4">
            <Label htmlFor="manage-inventory-small" size="small">
              Quanity
            </Label>
            {/* @ts-ignore */}
            <Input
              type="number"
              value={quantity}
              // @ts-ignore
              onInput={(e) => setQuantity(parseInt(e.target.value))}
              placeholder={!editOpen ? "Disabled" : "Quantity"}
              id="disabled-input"
              disabled={!editOpen}
            />
          </div>
        </div>

        <div className="flex">
          <div className="w-28 m-4">
            <Label htmlFor="manage-inventory-small" size="small">
              Mrp Price
            </Label>
            {/* @ts-ignore */}
            <Input
              type="number"
              // @ts-ignore
              value={Salesprice}
              // @ts-ignore
              onInput={(e) => setSalesPrice(parseInt(e.target.value))}
              placeholder={!editOpen ? "Disabled" : "Sales Price"}
              id="disabled-input"
              disabled={!editOpen}
            />
          </div>
          <div className="w-28 m-4">
            <Label htmlFor="manage-inventory-small" size="small">
              Product Color
            </Label>
            {/* @ts-ignore */}
            <Input
              type="text"
              // @ts-ignore
              value={productcolor}
              // @ts-ignore
              onInput={(e) => setColor(e.target.value)}
              placeholder={!editOpen ? "Disabled" : "Product Color"}
              id="disabled-input"
              disabled={!editOpen}
            />
          </div>

          <div className="w-28 m-4">
            <Label htmlFor="manage-inventory-small" size="small">
              Serail Number
            </Label>
            {/* @ts-ignore */}
            <Input
              type="text"
              // @ts-ignore
              value={product.id}
              // @ts-ignore
              onInput={(e) => setColor(e.target.value)}
              placeholder={!editOpen ? "Disabled" : "Product Serial Number"}
              id="disabled-input"
              disabled={true}
            />
            <Copy content={product.id} />

          </div>
        </div>

        <Button
          isLoading={loading}
          className="m-4"
          onClick={() => update_create_variant()}
        >
          Save
        </Button>
      </Container>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.before",
};

export default single_product;
