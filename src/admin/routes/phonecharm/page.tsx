import { RouteConfig } from "@medusajs/admin"

import { Bolt, Phone } from "@medusajs/icons"
import { Container, ProgressTabs } from "@medusajs/ui"
import { Heading, Button, Input } from "@medusajs/ui"
import { useAdminCustomQuery, useAdminCustomPost, useAdminUploadFile } from "medusa-react"
import { phone_thread } from "src/models/phone_thread"
import { ComputerDesktop, Spinner, EllipsisHorizontal, Plus, Trash } from "@medusajs/icons";
import { Label, Switch, Select, Copy, Code } from "@medusajs/ui";
import { Toaster, useToast, Table, StatusBadge, IconButton, } from "@medusajs/ui";
import { useAdminProductCategories, useAdminCreateProduct, useAdminProducts, useAdminDeleteProduct } from "medusa-react";
import React, { useState, useEffect, useMemo } from "react";
import { Drawer, Text } from "@medusajs/ui"
import { useToggleState } from "@medusajs/ui"
import { Prompt } from "@medusajs/ui"
const axios = require('axios');
import { useLocation, useNavigate } from "react-router-dom"
const PhoneCharm = () => {
    const { toast } = useToast();
    const { data, isLoading } = useAdminCustomQuery
        <{}, {}>(
            "/phonescharm",
            ["posts"]
            // {
            //     title: "My post"
            // }
        )


    const create_thread = useAdminCustomPost
        <{}, {}>(
            "/phonescharm",
            ["posts"]
        )
    const update_thread = useAdminCustomPost
        <{}, {}>(
            "/phonescharm/update",
            ["posts"]
        )
    const delete_thread = useAdminCustomPost
        <{}, {}>(
            "/phonescharm/delete",
            ["posts"]
        )

    let posts: phone_thread[] = []
    //@ts-ignore
    posts = data?.posts || []
    const navigate = useNavigate()
    const pageSize = 40;

    const [thread_name, setThreadName] = useState('')
    const [thread_qty, setThreadQty] = useState('')
    const [thread_img, setThreadImg] = useState('')
    const [thread_color, setThreadColor] = useState('')
    const [selected, setSelected] = useState(null)


    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = useMemo(() => {
        return posts ? Math.ceil(posts.length / pageSize) : 0;
    }, [posts, pageSize]);

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



    const uploadFile = useAdminUploadFile()
    function file_upload(event: any, title) {
        var file = event.target.files[0]
        uploadFile.mutate(file, {
            onSuccess: ({ uploads }) => {
                var key = uploads[0].key
                setThreadImg(key);
            }
        })

    }


    // create 


    function createthread() {
        create_thread.mutate({
            thread_name: thread_name,
            thread_qty: thread_qty,
            thread_img: thread_img,
            thread_color: thread_color
        }, {
            // @ts-ignore
            onSuccess: ({ post }) => {
                toast({ title: "Successful", description: "Created" });
            }
        })
    }
    // delete
    function deletethread(id) {
        delete_thread.mutate({
            id: id
        }, {
            // @ts-ignore
            onSuccess: ({ post }) => {

                toast({ title: "Successful", description: "Deleted" });
            }
        })
    }

    //update

    function updateThread(type, value, id) {
        var n = {}
        if (type == 'thread_name') {
            setThreadName(value)
            n = {
                id: id,
                thread_name: value
            }
        }
        else if (type == 'thread_color') {
            setThreadColor(value)
            n = {
                id: id,
                thread_color: value
            }
        }
        else if (type == 'thread_qty') {
            setThreadQty(value)
            n = {
                id: id,
                thread_qty: value
            }
        }

        update_thread.mutate(n, {
            // @ts-ignore
            onSuccess: ({ post }) => {

                toast({ title: "Successful", description: "Updated" });
            }
        })
    }
    return (
        <Container>
            <Toaster />
            <Heading level="h1">Phone Charms Colors </Heading>
            <Prompt>
                <Prompt.Trigger asChild>
                    <Button>Add Thread</Button>
                </Prompt.Trigger>
                <Prompt.Content>
                    <Prompt.Header>
                        <Prompt.Title>Add Thread</Prompt.Title>
                        <Prompt.Description>
                            <Input className="m-3" placeholder="Thread Name" id="sales-channel-name"
                                onInput={(e) => {
                                    // @ts-ignore
                                    setThreadName(e.target.value)
                                }}
                            />
                            <Input className="m-3" placeholder="Thread Color" id="sales-channel-name"
                                onInput={(e) => {
                                    // @ts-ignore
                                    setThreadColor(e.target.value)
                                }}
                            />
                            <Input className="m-3" placeholder="Thread Qty" id="sales-channel-name"
                                onInput={(e) => {
                                    // @ts-ignore
                                    setThreadQty(e.target.value)
                                }}
                            />
                            <Input className="m-3" placeholder="Thread image"
                                onInput={(e) => {
                                    // @ts-ignore
                                    file_upload(e)

                                    // upload image
                                }}
                                type="file" id="sales-channel-name"
                            />
                        </Prompt.Description>
                    </Prompt.Header>
                    <Prompt.Footer>
                        <Prompt.Cancel>Cancel</Prompt.Cancel>
                        <Button onClick={() => { createthread() }} >Create</Button>
                    </Prompt.Footer>
                </Prompt.Content>
            </Prompt>


            {posts == null ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner className="animate-spin h-5 w-5 mr-3 " />
                </div>
            ) : (
                posts && posts.length > 0 ? (
                    <>
                        <Table className="mb-6">
                            <Table.Header>
                                <Table.Row >
                                    <Table.HeaderCell className="w-10">#</Table.HeaderCell>
                                    <Table.HeaderCell className="w-32">Thread Name</Table.HeaderCell>
                                    <Table.HeaderCell className="w-32">Thread Color</Table.HeaderCell>
                                    <Table.HeaderCell className="w-32">Thread Qty</Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {posts.map((product, i) => (
                                    <Table.Row key={product.id} className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap h-40">

                                        <Table.Cell>{i + 1}</Table.Cell>
                                        <Table.Cell className=" w-60">
                                            <img src={process.env.MEDUSA_ADMIN_BACKEND_URL + '/uploads/' + product.thread_img} alt={product.thread_color} className="h-10  object-cover mr-2" />

                                            <div>
                                                <Input placeholder="Product Name"
                                                    onBlur={(e) => {
                                                        updateThread('thread_name', e.target.value, product.id)
                                                        // updateProduct(product.id, 'title', e.target.value)
                                                    }}
                                                    defaultValue={product.thread_name} id="sales-channel-name" className="m-2" />
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input
                                                // @ts-ignore
                                                onBlur={(e) => {
                                                    updateThread('thread_color', e.target.value, product.id)
                                                    // updateVariantPrice(product.id, product?.variants?.[0]?.id, 'inventory', e.target.value)
                                                }}
                                                onInput={(e) => {
                                                    // @ts-ignore
                                                    updateThread('thread_color', e.target.value, product.id)
                                                    // updateVariantPrice(product.id, product?.variants?.[0]?.id, 'inventory', e.target.value)
                                                }}
                                                placeholder="Product Inventory Quantity"
                                                defaultValue={product.thread_color}
                                                id="sales-channel-name"
                                                className="m-2"
                                            />
                                        </Table.Cell>


                                        <Table.Cell>
                                            <Input
                                                // @ts-ignore
                                                onBlur={(e) => {
                                                    updateThread('thread_qty', e.target.value, product.id)

                                                    // updateVariantPrice(product.id, product?.variants?.[0]?.id, 'inventory', e.target.value)
                                                }}
                                                onInput={(e) => {

                                                    // @ts-ignore
                                                    updateThread('thread_qty', e.target.value, product.id)
                                                    // updateVariantPrice(product.id, product?.variants?.[0]?.id, 'inventory', e.target.value)
                                                }}
                                                placeholder="Product Inventory Quantity"
                                                defaultValue={product.thread_qty}
                                                id="sales-channel-name"
                                                className="m-2"
                                            />
                                        </Table.Cell>

                                        <Table.Cell>
                                            {/* <Copy content={product.id}>
                                                <Code>Copy Serial Number</Code>
                                            </Copy> */}

                                        </Table.Cell>
                                        <Table.Cell className="text-right">

                                            {/* <IconButton onClick={() => { navigate(`/a/products/${product.id}`) }}>
                                                <EllipsisHorizontal />
                                            </IconButton> */}
                                            <IconButton color="red" onClick={() => {
                                                deletethread(product.id)
                                            }}>
                                                <Trash />
                                            </IconButton>




                                            {/* EllipsisHorizontal */}
                                        </Table.Cell>

                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
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

    )
}
export const config: RouteConfig = {
    link: {
        label: "Phone Charm",
        icon: Phone
    },
}
export default PhoneCharm