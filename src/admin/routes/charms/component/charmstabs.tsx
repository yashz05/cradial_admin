import { RouteConfig } from "@medusajs/admin";
import { Sun } from "@medusajs/icons";
import { Container, ProgressTabs } from "@medusajs/ui";
import { useAdminCustomQuery, useAdminCustomPost } from "medusa-react";
import { useToast } from "@medusajs/ui";
import { charms_parent_cat } from "src/models/charm_parent_cat";
import { Drawer, Button, Text, Tabs, Prompt, Input } from "@medusajs/ui"
import { charms_sub_cat } from "src/models/charms_sub_cat";
import React, { useRef } from 'react';
import { Toaster, Label, Switch } from "@medusajs/ui"
import { Trash, Plus } from "@medusajs/icons"
import { IconButton } from "@medusajs/ui"


export function CharmsSubCat({
    id, name
}, {
    id: number, name: string
}) {

    const { toast } = useToast();
    const { data, isLoading } = useAdminCustomQuery<{}, {}>(
        "/charms/subcat/",
        ["message"]
    );
    const inputRef = useRef();
    var active = false;

    const customPost = useAdminCustomPost
        <{}, {}>(
            // @ts-ignore
            `/charms/subcat/`,
            ["message"]
        )
    const update_charm_cat = useAdminCustomPost
        <{}, {}>(
            // @ts-ignore
            `/charms/subcat/update`,
            ["message"]
        )
    const delte_charm_cat = useAdminCustomPost
        <{}, {}>(
            // @ts-ignore
            `/charms/subcat/delete`,
            ["message"]
        )


    function create_new() {
        // @ts-ignore
        console.log(inputRef.current.value);
        // ...

        customPost.mutate({
            // @ts-ignore
            name: inputRef.current.value,
            active: true,
            parentId: id
        }, {
            // @ts-ignore
            onSuccess: ({ n }) => {
                // alert("Category Created")
                // window.location.reload()

            }
        })

    }
    function update_sub_cat(uid) {
        // @ts-ignore
        console.log(uid, active);

        // console.log(inputRef.current.value);
        // // ...

        update_charm_cat.mutate({
            // @ts-ignore
            name: inputRef.current.value,
            active: active,
            parentId: id,
            id: uid
        }, {
            // @ts-ignore
            onSuccess: ({ n }) => {
                // alert("Category Update")/
                // window.location.reload()

            }
        })

    }
    function delete_sub_cat(uid) {
        // @ts-ignore
        console.log(uid, active);

        // console.log(inputRef.current.value);
        // // ...

        delte_charm_cat.mutate({
            // @ts-ignore
            id: uid
        }, {
            // @ts-ignore
            onSuccess: ({ n }) => {
                // alert("Category Update")/
                // window.location.reload()
            }
        })

    }
    return (
        <>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Prompt>
                        <Prompt.Trigger asChild>
                            <Button>Create New Category</Button>
                        </Prompt.Trigger>
                        <Prompt.Content>
                            <Prompt.Header>
                                <Prompt.Title>Add New category to {name}</Prompt.Title>
                                <Prompt.Description>
                                    <div className="w-[250px]">
                                        <Input placeholder="category Name" ref={inputRef} id="sales-channel-name" />
                                    </div>

                                </Prompt.Description>
                            </Prompt.Header>
                            <Prompt.Footer>
                                <Prompt.Cancel>Cancel</Prompt.Cancel>
                                <Prompt.Action onClick={create_new}>Create</Prompt.Action>
                            </Prompt.Footer>
                        </Prompt.Content>
                    </Prompt>
                    <div className="grid grid-cols-4 gap-4  w-full mt-3">


                        {/* @ts-ignore */}
                        {data.message
                            .filter((e: charms_sub_cat) => e.parentId === id)
                            .map((person: charms_sub_cat) => (
                                <>
                                    <Prompt>
                                        <Prompt.Trigger asChild>
                                            <div
                                                key={person.id}
                                                className={`relative flex items-center space-x-3 rounded-lg border border-gray-300 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 ${person.active ? "bg-white" : "bg-gray-300"
                                                    }`}

                                            >
                                                <div className="min-w-0 flex-1">
                                                    <a href="#" className="focus:outline-none">
                                                        <span className="absolute inset-0" aria-hidden="true" />
                                                        <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </Prompt.Trigger>
                                        <Prompt.Content>
                                            <Prompt.Header>
                                                <Prompt.Title>Edit {person.name}</Prompt.Title>
                                                <Prompt.Description>

                                                    <Input placeholder="category Name" defaultValue={person.name} ref={inputRef} id="sales-channel-name" />
                                                    <div className="flex items-center gap-x-2 mt-4">
                                                        <Switch id="manage-inventory" defaultChecked={person.active} onCheckedChange={(e) => { active = e }} />
                                                        <Label htmlFor="manage-inventory">Active ?</Label>
                                                    </div>
                                                    <IconButton >

                                                    </IconButton>


                                                </Prompt.Description>
                                            </Prompt.Header>
                                            <Prompt.Footer>
                                                <Prompt.Cancel>Cancel</Prompt.Cancel>
                                                <Prompt.Action onClick={(e) => update_sub_cat(person.id)}>Update</Prompt.Action>
                                                <Prompt.Action onClick={(e) => window.location.href = `/a/charmsadd/add/${person.id}`}><Plus /></Prompt.Action>
                                                <Prompt.Action onClick={(e) => delete_sub_cat(person.id)}> <Trash /></Prompt.Action>
                                            </Prompt.Footer>
                                        </Prompt.Content>
                                    </Prompt >



                                </>

                            ))}
                    </div>
                </>
            )
            }
        </>
    );
}

function useEffect(arg0: () => void) {
    throw new Error("Function not implemented.");
}
