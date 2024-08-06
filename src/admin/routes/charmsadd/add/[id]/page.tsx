import { Container, Text } from "@medusajs/ui";
import { useAdminCustomPost, useAdminCustomDelete, useAdminUploadFile } from "medusa-react";
import { useToast, Heading, Prompt, Button, Input } from "@medusajs/ui";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconButton } from "@medusajs/ui"
import { Trash } from "@medusajs/icons"
import { charms_parent_cat } from "src/models/charm_parent_cat";

const CustomCharmsadd = () => {
    const { toast } = useToast();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [qty, setQty] = useState("");
    const [active, setActive] = useState("");
    const [order, setOrder] = useState("");
    const [parent_cat, setParentCat] = useState("");
    const [charm, setCharm] = useState(null);
    const [loading, setLoading] = useState(false);


    const customPost = useAdminCustomPost<{}, { post: any }>("/charms/subcat/single/", ["message"]);
    const new_charm = useAdminCustomPost<{}, { post: any }>("/charms/list/", ["message"]);
    const list_charms = useAdminCustomPost<{}, { post: any }>("/charms/list/list?parent_cat=" + id, ["message"]);
    const list_charm_uupdate = useAdminCustomPost<{}, { post: any }>("/charms/list/update", ["message"]);
    const list_charm_delete = useAdminCustomPost<{}, { post: any }>("/charms/list/delete/", ["message"]);



    const get_data = () => {
        console.log("Fetching data with id:", id);
        customPost.mutate(
            { "id": id, "yasdh": "wef" },
            {
                onSuccess: (e) => {
                    console.log("Data fetched successfully:", e);
                    setData(e);
                },
                onError: (error) => {
                    console.error("Error fetching data:", error);
                    toast({ title: "Error", description: error.message });
                }
            }
        );
        list_charms.mutate(
            {},
            {
                onSuccess: (e) => {
                    console.log("Data fetched successfully:", e);
                    // @ts-ignore
                    var da = e.message.sort((a, b) => a.order - b.order)
                    setCharm(da);
                    console.log(da);

                },
                onError: (error) => {
                    console.error("Error fetching data:", error);
                    toast({ title: "Error", description: error.message });
                }
            }
        );
    };

    const uploadFile = useAdminUploadFile()
    function file_upload(event: any) {
        setLoading(true)

        var file = event.target.files[0]
        uploadFile.mutate(file, {
            onSuccess: ({ uploads }) => {
                var key = uploads[0].key
                setImage(key)
                setLoading(false)
                console.log(key)
            }
        })

    }
    function add_charm() {
        setLoading(true)
        // name: name.toString(),
        // image: image.toString(),
        // qty: parseInt(qty.toString()),
        // active: active.toString() === 'true' ? true : false,
        // order: parseInt(order.toString()),
        // parent_cat: parent_cat.toString()
        new_charm.mutate({
            "name": name,
            "image": image,
            "qty": qty,
            "active": active.toString() === 'true' ? true : false,
            "order": order,
            "parent_cat": id
        }, {
            onSuccess: (e) => {
                setLoading(true)
                window.location.reload();


            }
        })

    }
    function cahrm_update(e, q, v) {
        alert(e)
        alert(q)
        alert(v)
        if (v == e[q]) {
            return;
        }
        setLoading(true)

        list_charm_uupdate.mutate({
            id: e.id,
            "name": q == "name" ? v : e.name,
            "image": q == "image" ? v : e.image,
            "qty": q == "qty" ? v : e.qty,
            "active": q == "active" ? v : e.active.toString() === 'true' ? true : false,
            "order": q == "order" ? v : e.order,
            "parent_cat": q == "parent_cat" ? v : e.parent_cat
        }, {
            onSuccess: (e) => {
                setLoading(true)
                // window.location.reload();
                alert('updated')


            }
        })

    }
    function delete_charms(id) {

        setLoading(true)

        list_charm_delete.mutate({
            id: id,

        }, {
            onSuccess: (e) => {
                setLoading(true)

                alert('Deleted')
                window.location.reload();

            }
        })

    }



    useEffect(() => {
        if (id) {
            get_data();

        }
    }, [id]);

    return (
        <Container>
            {data ? (
                <Heading level="h1">Add Charms to {data.message.name}</Heading>

            ) : (
                <Text>Loading...</Text>
            )}

            <Prompt>
                <Prompt.Trigger asChild>
                    <Button>Add new Charm </Button>
                </Prompt.Trigger>
                <Prompt.Content>
                    <Prompt.Header>
                        <Prompt.Title>Delete something</Prompt.Title>
                        <Prompt.Description>
                            <div className="w-[250px] mt-3">
                                <Input onChange={(e) => { setName(e.target.value) }} placeholder="Charm Name" id="sales-channel-name" />
                            </div>

                            <div className="w-[250px] mt-3">
                                <Input onChange={(e) => { setOrder(e.target.value) }} placeholder="Charm Order" id="sales-channel-name" />
                            </div>

                            <div className="w-[250px] mt-3">
                                <Input onChange={(e) => { setQty(e.target.value) }} placeholder="Charm QTY" id="sales-channel-name" />
                            </div>
                            <input
                                type="file"
                                className="mt-4 text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-medium

   file:bg-stone-50 file:text-stone-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
                                onChange={file_upload}
                            />

                        </Prompt.Description>
                    </Prompt.Header>
                    <Prompt.Footer>
                        <Prompt.Cancel>Cancel</Prompt.Cancel>
                        <Button isLoading={loading} onClick={add_charm}>Add  Charm</Button>

                        {/* <Prompt.Action>Add</Prompt.Action> */}
                    </Prompt.Footer>
                </Prompt.Content>
            </Prompt>
            <div className="px-4 sm:px-6 lg:px-8">

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Order
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Qty
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Delete
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {
                                        charm != null ?
                                            charm.map((e) => (
                                                <tr key={e.id}>
                                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                        <div className="flex items-center">
                                                            <div className="h-11 w-11 flex-shrink-0">
                                                                <img className="h-11 w-11 rounded-full" src={"/uploads/" + e.image} alt="" />
                                                            </div>
                                                            <div className="ml-4 w-14">
                                                                <div className="font-medium text-gray-900">{e.name}</div>
                                                                <div className="mt-1 text-gray-500">{e.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm w-20 text-gray-500">
                                                        <Input placeholder="Order" defaultValue={e.order} onChange={(v) => {
                                                            // @ts-ignore

                                                            cahrm_update(e, "order", v.target.value)
                                                        }} id="sales-channel-name" />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm w-20 text-gray-500">
                                                        <Input placeholder="qty"
                                                            onChange={(v) => {
                                                                // @ts-ignore

                                                                cahrm_update(e, "qty", v.target.value)
                                                            }}

                                                            defaultValue={e.qty} id="sales-channel-name" />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <IconButton className="bg-red-500" onClick={() => { delete_charms(e.id) }}>
                                                            <Trash />
                                                        </IconButton>


                                                    </td>
                                                </tr>
                                            )) : <>No Charms</>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-7  gap-4 mt-3">
                {
                    charm != null ?
                        <>
                            {
                                // @ts-ignore
                                charm.map((e: any) => {

                                    return (
                                        <>
                                        </>
                                        // <div key={e.id} className="bg-white p-3 rounded-md">
                                        //     <img className="inline-block h-14 w-14 rounded-md"
                                        //         src={"/uploads/" + e.image}
                                        //         alt="" />
                                        //     <div>
                                        //         <p>{e.name}</p>
                                        //         <p>qty : {e.qty}</p>
                                        //         <p>Order : {e.order}</p>
                                        //     </div>

                                        // </div>
                                    )
                                })
                            }

                        </> : <>
                        </>
                }

            </div>

        </Container>
    );
};

export default CustomCharmsadd;
