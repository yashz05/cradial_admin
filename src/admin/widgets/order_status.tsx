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
import { useAdminAddShippingMethod } from "medusa-react"

import type { OrderDetailsWidgetProps } from "@medusajs/admin";
import { log } from "console";

const OrderStatus = ({ order, notify }: OrderDetailsWidgetProps) => {
  // console.log(order,"okokokok");
  // console.log(order.shipping_methods);



  const [editOpen, showEdit, closeEdit, toggle] = useToggleState(true);
  const [price, setPrice] = useState(0);

  const [Salesprice, setSalesPrice] = useState(0);
  const [productcolor, setColor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [loading, setloading] = useState(false);
  const addShippingMethod = useAdminAddShippingMethod(
    order.id
  )
  console.log(order);

  var status = [
    {
      "not_fulfilled": "Processing",
    },
    {
      "fulfilled": "Packed",
    },
    {
      "shipped": "Shipped",
    },
    {
      "partially_shipped": "Out For Delivery",
    },
    {
      "completed": "Completed",
    }

  ]
  useEffect(() => {
    if (order.shipping_methods.length <= 0) {

      // paid shipping 
      // so_01HZSA5Z3KBKCP5DG24QC4G9JJ

      //free shipping
      // so_01J354MKVBTC4ZY0P2XKZRFY9N
      // console.log(order);
      if (order.subtotal < 70000) {
        addShippingMethod.mutate({
          option_id: "so_01HZSA5Z3KBKCP5DG24QC4G9JJ",
          price: 5000
        }, {
          onSuccess: ({ order }) => {
            // console.log(order.shipping_methods)
            // @ts-ignore
            window.reload()
          }
        })
      } else {
        addShippingMethod.mutate({
          option_id: "so_01J354MKVBTC4ZY0P2XKZRFY9N",
          price: 0
        }, {
          onSuccess: ({ order }) => {
            // console.log(order.shipping_methods)
            // @ts-ignore
            window.reload()
          }
        })
      }

      // alert("No Shipping Method Selected");

    }
  }, [])



  return (
    <>

      <Container>
        <Heading level="h1">Order Status</Heading>



        <div style={{
          display: "flex"
        }}>
          <Button className="mx-2">Packed</Button>
          <Button className="mx-2">Shipped</Button>
          <Button className="mx-2">Out For Delivery </Button>
          <Button variant="primary" className="mx-2">Completed</Button>
          {/* <Button>Button</Button> */}


        </div>
      </Container>
    </>
  );
};

export const config: WidgetConfig = {
  zone: "order.details.before",
};

export default OrderStatus;