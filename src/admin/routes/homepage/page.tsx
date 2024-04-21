import { RouteConfig } from "@medusajs/admin"
import { ComputerDesktop } from "@medusajs/icons"
import { Label, Switch, Container, Heading } from "@medusajs/ui"
import axios from 'axios';
import { useAdminCustomQuery, useAdminCustomPost, useAdminUploadFile } from "medusa-react"
import { HomePage } from "./../../../models/home_page";
import { Button, Toaster, useToast } from "@medusajs/ui"

import { log } from "console";

const CustomPage = () => {
    const { toast } = useToast()

    type RequestQuery = {
    }

    type ResponseData = {
    }
    type PostRequest = {
        title: string,
        value: string
    }
    type PostResponse = {
        post: HomePage
    }

    let posts: HomePage[] = []

    const { data, isLoading } = useAdminCustomQuery
        <RequestQuery, ResponseData>(
            "/homepage",
            ["posts"]
            // {
            //     title: "My post"
            // }
        )
    //@ts-ignore
    posts = data?.posts || []
    console.log(posts.find((e) => (e.title == 'category'))?.value);




    const customPost = useAdminCustomPost
        <PostRequest, PostResponse>(
            "/homepage/abc/",
            ["posts"]
        )
    function settings_update(title: string, value: string) {
        customPost.mutate({
            title,
            value
        }, {
            onSuccess: ({ post }) => {
                console.log(post)
                toast({
                    title: "Info",
                    description: title + " updated sucessfully",
                    variant: "success",
                    duration: 5
                })

            }
        })
    }
    const uploadFile = useAdminUploadFile()
    function file_upload(event: any, title) {
        var file = event.target.files[0]
        uploadFile.mutate(file, {
            onSuccess: ({ uploads }) => {
                var key = uploads[0].url
                settings_update(title, key);
            }
        })

    }

    return (




        <Container><Toaster />

            <div className="flex items-start justify-between"><div>
                <h1 className="inter-xlarge-semibold text-grey-90">Home Page </h1>
                <h3 className="inter-small-regular text-grey-50 pt-1.5">Alter Home Page content </h3>
            </div><div className="flex items-center space-x-2">
                    <div>
                        {/* <button type="button" className="btn btn-secondary btn-small flex items-center">
                        <span className="mr-xsmall last:mr-0">Add category</span></button> */}
                    </div></div></div>


            {
                isLoading ?
                    <div>Loading...</div> : <>

                        <div className="flex items-center gap-x-2 mt-5">
                            <Switch id="manage-inventory-small" size="small" defaultChecked={
                                posts.find((e) => (e.title == 'category'))?.value == 'true' ? true : false
                            } onCheckedChange={(n) => settings_update("category", String(n))} />


                            <Label htmlFor="manage-inventory-small" size="small" >
                                Enable Top Categories
                            </Label>
                        </div>

                        <div className=" items-center gap-x-2 mt-5">
                            {
                                posts.find((e) => (e.title == 'home_header'))?.value != null ? <img className="h-40 w-full rounded-2xl object-contain" src={posts.find((e) => (e.title == 'home_header'))?.value} alt="" /> : null
                            }
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Home Page Banner Upload file</label>
                            <input onChange={(e) => file_upload(e, 'home_header')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        </div>

                    </>
            }

        </Container>
    )
}
export const config: RouteConfig = {
    link: {
        label: "Home Page",
        icon: ComputerDesktop,
    },
}


export default CustomPage




