import { ComputerDesktop, Spinner, EllipsisHorizontal, Plus, Trash } from "@medusajs/icons";
import { Label, Switch, Container, Heading, Select, Copy, Code } from "@medusajs/ui";
import { useAdminCustomQuery, useAdminCustomPost, useAdminUploadFile } from "medusa-react";
import { Button, Toaster, useToast, Table, Input, StatusBadge, IconButton, } from "@medusajs/ui";
import { useAdminProductCategories, useAdminCreateProduct, useAdminProducts, useAdminDeleteProduct } from "medusa-react";
import React, { useState, useEffect, useMemo } from "react";
import { Drawer, Text } from "@medusajs/ui"
import { useToggleState } from "@medusajs/ui"
import { Prompt } from "@medusajs/ui"
const axios = require('axios');

import { useLocation, useNavigate } from "react-router-dom"
const CustomPage = () => {
  type CreateProductData = {
    title: string
    is_giftcard: boolean
    discountable: boolean
  }

  const { toast } = useToast();
  const [creating, setcreating] = useState(false)
  const { product_categories, isLoading: isLoadingCategories } = useAdminProductCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [product_anme, setproduct_anme] = useState<string>('');
  const [catId, setCatId] = useState<string>('');
  const [open, setOpen] = useState(true)
  const location = useLocation()
  const [view, setView] = useState("products")
  const {
    state: createProductState,
    close: closeProductCreate,
    open: openProductCreate,
  } = useToggleState(
    !location.search.includes("view=collections") &&
    location.search.includes("modal=new")
  )
  const { products, isLoading: isLoadingProducts } = useAdminProducts(
    catId
      ? {
        category_id: [catId],
        expand: 'categories,variants,variants.prices',
        limit : 799
      }
      : {
        expand: 'categories,variants,variants.prices',
        limit : 799
      }
  );
  const navigate = useNavigate()
  const pageSize = 40;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = useMemo(() => {
    return products ? Math.ceil(products.length / pageSize) : 0;
  }, [products, pageSize]);

  const canNextPage = useMemo(() => currentPage < pageCount - 1, [currentPage, pageCount]);
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);
  const [evariants, seteVariants] = useState([]);
  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentProducts = useMemo(() => {
    if (!products) return [];
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, products.length);
    return products.slice(offset, limit);
  }, [currentPage, pageSize, products]);
  const createProduct = useAdminCreateProduct()
  async function deleteProduct(productId) {
    var options = {
      method: 'DELETE',
      url: `${process.env.MEDUSA_ADMIN_BACKEND_URL}/admin/products/${productId}`,
      headers: {
        'x-medusa-access-token': `pk_01HYXJRC7R1M64WMHYJK6CJ9ME`
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      alert("Deleted Please Reresh the page")
    }).catch(function (error) {
      console.error(error);
    });
  }
  async function updateProduct(productId, fieldPath, value) {
    try {
      // Construct the data object dynamically based on the fieldPath
      const data = fieldPath.split('.').reduceRight((acc, curr) => ({ [curr]: acc }), value);

      const options = {
        method: 'POST',
        url: `${process.env.MEDUSA_ADMIN_BACKEND_URL}/admin/products/${productId}`,
        headers: {
          'x-medusa-access-token': 'pk_01HYXJRC7R1M64WMHYJK6CJ9ME',
          'Content-Type': 'application/json'
        },
        data: data
      };

      const response = await axios.request(options);
      console.log(response.data);
      console.log("Updated. Please refresh the page.");
      toast({ title: "Successful", description: "Updated" });

    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }

  async function update_varaiant(productid, variantid, title, value) {
    try {
      const data = title === 'variant_price'
        ? { prices: [{ amount: parseInt(value) * 100, currency_code: 'inr' }] }
        : { inventory_quantity: parseInt(value) };

      const options = {
        method: 'POST',
        url: `${process.env.MEDUSA_ADMIN_BACKEND_URL}/admin/products/${productid}/variants/${variantid}`,
        headers: {
          'x-medusa-access-token': 'pk_01HYXJRC7R1M64WMHYJK6CJ9ME',
          'Content-Type': 'application/json'
        },
        data
      };

      const response = await axios.request(options);

      if (response.status === 200) {
        toast({ title: 'Successful', description: 'Updated' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function updateVariantPrice(productid, variantid, title, value) {
    var options = {
      method: 'POST',
      url: `${process.env.MEDUSA_ADMIN_BACKEND_URL}/admin/products/${productid}/variants/${variantid}`,
      headers: {
        'x-medusa-access-token': 'pk_01HYXJRC7R1M64WMHYJK6CJ9ME',
        'Content-Type': 'application/json'
      },
      data: { prices: [{ amount: parseInt(value) * 100, currency_code: 'inr' }] }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }

  useEffect(() => {

  }, [products])


  return (
    <>

     
      <Container className="p-6">
        <Toaster />
        {isLoadingCategories ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="animate-spin h-5 w-5 mr-3 " />
          </div>
        ) : (
          <>
            <Heading level="h1" className="mb-6">Products</Heading>
            <Prompt>
              <Prompt.Trigger asChild>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={openProductCreate}
                >
                  <Plus />
                  New Product
                </Button>
              </Prompt.Trigger>
              <Prompt.Content>
                <Prompt.Header>
                  <Prompt.Title>Create New Product</Prompt.Title>
                  <Prompt.Description>
                    <div className="w-[250px]">
                      <Input onChange={(e) => {
                        setproduct_anme(e.target.value)
                      }} placeholder="Product Name" id="Product name" />
                    </div>

                  </Prompt.Description>
                </Prompt.Header>
                <Prompt.Footer>
                  <Prompt.Cancel>Cancel</Prompt.Cancel>

                  <Button isLoading={creating} onClick={() => {
                    setcreating(true);
                    createProduct.mutate({
                      title: product_anme,
                      is_giftcard: false,
                      discountable: true,
                      metadata: {
                        sales_price: 0
                      }
                    }, {
                      onSuccess: ({ product }) => {
                        navigate(`/a/products/${product.id}`)
                        setcreating(false);
                      }
                    })

                  }}>Create</Button>

                </Prompt.Footer>
              </Prompt.Content>
            </Prompt>


            <div className="flex gap-4 mb-6">
              {/* @ts-ignore */}
              <Select onValueChange={(e) => { setSelectedCategory(e); setCatId(e); }} className="w-full max-w-xs">
                <Select.Trigger>
                  <Select.Value placeholder="Select Category" />
                </Select.Trigger>
                <Select.Content>
                  {product_categories
                    .filter(item => item.category_children.length > 1)
                    .map((item) => (
                      <Select.Item key={item.id} value={item.id}>
                        {item.name}
                      </Select.Item>
                    ))}
                </Select.Content>
              </Select>

              {selectedCategory && (
                // @ts-ignore
                <Select onValueChange={(e) => { setSelectedSubCategory(e); setCatId(e); }} className="w-full max-w-xs">
                  <Select.Trigger>
                    <Select.Value placeholder="Select Sub-Category" />
                  </Select.Trigger>
                  <Select.Content>
                    {product_categories
                      .filter(item => item.parent_category_id === selectedCategory)
                      .map((item) => (
                        <Select.Item key={item.id} value={item.id}>
                          {item.name}
                        </Select.Item>
                      ))}
                  </Select.Content>
                </Select>
              )}
            </div>
          </>
        )}

        {isLoadingProducts ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="animate-spin h-5 w-5 mr-3 " />
          </div>
        ) : (
          products && products.length > 0 ? (
            <>
              <Table className="mb-6">
                <Table.Header>
                  <Table.Row >
                    <Table.HeaderCell className="w-10">#</Table.HeaderCell>
                    <Table.HeaderCell className="w-32">Product</Table.HeaderCell>
                    <Table.HeaderCell className="w-20">Status</Table.HeaderCell>
                    <Table.HeaderCell className="w-32 h-6">MRP</Table.HeaderCell>
                    <Table.HeaderCell className="w-32 h-6">Final Price</Table.HeaderCell>
                    <Table.HeaderCell className="w-32 h-6">Quantity</Table.HeaderCell>

                    <Table.HeaderCell className="text-right">Serial Number</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {currentProducts.map((product, i) => (
                    <Table.Row key={product.id} className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap h-40">
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell className="flex w-60"><img src={product.thumbnail} alt={product.title} className="h-10  object-cover mr-2" /><div>
                        <Input placeholder="Product Name"
                          onBlur={(e) => {
                            updateProduct(product.id, 'title', e.target.value)
                          }}
                          defaultValue={product.title} id="sales-channel-name" className="m-2" />
                        <Input placeholder="Product Subtitle" onBlur={(e) => {
                          updateProduct(product.id, 'subtitle', e.target.value)
                        }} defaultValue={product.subtitle} id="sales-channel-name" className="m-2" />


                      </div></Table.Cell>
                      <Table.Cell>
                        <StatusBadge
                          onClick={() =>
                            updateProduct(
                              product.id,
                              'status',
                              product.status === 'published' ? 'draft' : 'published'
                            )
                          }
                          color={product.status === 'published' ? 'green' : 'red'}
                        >
                          {product.status}
                        </StatusBadge>
                      </Table.Cell>

                      <Table.Cell>
                        <Input
                          placeholder="Product Discount Price to show"
                          onBlur={(e) => {
                            updateProduct(product.id, 'metadata.sales_price', e.target.value)
                          }}
                          // @ts-ignore

                          defaultValue={product?.metadata?.sales_price ?? 0}
                          id="sales-channel-name"
                          className="m-2"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          // @ts-ignore
                          onBlur={(e) => {
                            updateVariantPrice(product.id, product?.variants?.[0]?.id, 'inventory', e.target.value)
                          }}
                          onInput={(e) => {
                            // @ts-ignore
                            updateVariantPrice(product.id, product?.variants?.[0]?.id, 'inventory', e.target.value)
                          }}
                          placeholder="Product Inventory Quantity"
                          defaultValue={product?.variants?.[0]?.prices[0].amount / 100 ?? 0}
                          id="sales-channel-name"
                          className="m-2"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          onBlur={(e) => {
                            update_varaiant(product.id, product?.variants?.[0]?.id, 'inventory', e.target.value)
                          }}
                          placeholder="Product Inventory Quantity"
                          defaultValue={product?.variants?.[0]?.inventory_quantity ?? 0}
                          id="sales-channel-name"
                          className="m-2"
                        />
                      </Table.Cell>

                      <Table.Cell>
                        <Copy content={product.id}>
                          <Code>Copy Serial Number</Code>
                        </Copy>

                      </Table.Cell>
                      <Table.Cell className="text-right">

                        <IconButton onClick={() => { navigate(`/a/products/${product.id}`) }}>
                          <EllipsisHorizontal />
                        </IconButton>
                        <IconButton color="red" onClick={() => { deleteProduct(product.id) }}>
                          <Trash />
                        </IconButton>


                        {/* <Drawer>
                            <Drawer.Trigger asChild>
                              <Button> <EllipsisHorizontal /></Button>
                            </Drawer.Trigger>
                            <Drawer.Content>
                              <Drawer.Header>
                                <Drawer.Title>Edit / Add Variant</Drawer.Title>
                              </Drawer.Header>
                              <Drawer.Body className="p-4">
                                <Text>This is where you edit the variant&apos;s details</Text>
                              </Drawer.Body>
                              <Drawer.Footer>
                                <Drawer.Close asChild>
                                  <Button variant="secondary">Cancel</Button>
                                </Drawer.Close>
                                <Button>Save</Button>
                              </Drawer.Footer>
                            </Drawer.Content>
                          </Drawer> */}

                        {/* EllipsisHorizontal */}
                      </Table.Cell>

                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={!canPreviousPage}>Previous</Button>
                <span>Page {currentPage + 1} of {pageCount}</span>
                <Button onClick={nextPage} disabled={!canNextPage}>Next</Button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">No products available</div>
          )
        )}
      </Container>
    </>
  );
};

export default CustomPage;
