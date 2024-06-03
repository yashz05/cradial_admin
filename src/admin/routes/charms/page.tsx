import { RouteConfig } from "@medusajs/admin";
import { Sun } from "@medusajs/icons";
import { Container, ProgressTabs } from "@medusajs/ui";
import { useAdminCustomQuery } from "medusa-react";
import { useToast } from "@medusajs/ui";
import { charms_parent_cat } from "src/models/charm_parent_cat";
import { Drawer, Button, Text, Tabs } from "@medusajs/ui"
import { charms_sub_cat } from "src/models/charms_sub_cat";
import { CharmsSubCat } from "./component/charmstabs";
import { log } from "console";
import axios from "axios";

const CustomPage = () => {
    const { toast } = useToast();

    type RequestQuery = {};

    type ResponseData = {
        message: charms_parent_cat[];
    };

    const { data, isLoading } = useAdminCustomQuery<RequestQuery, ResponseData>(
        "/charms/maincat/",
        ["message"]
    );

    // Remove the following line
    // const { data2, isLoading2 } = useAdminCustomQuery<RequestQuery, ResponseData>(
    //     "/charms/maincat/",
    //     ["message"]
    // );
    const sub_cats_d = []
    // @ts-ignore

  


    return (
        <Container>
            <ProgressTabs defaultValue="1" >
                <ProgressTabs.List >
                    {data?.message?.map((e: charms_parent_cat) => (
                        <ProgressTabs.Trigger key={e.id} value={e.id.toString()}>
                            {e.name}
                        </ProgressTabs.Trigger>
                    ))}
                </ProgressTabs.List>
                {data?.message?.map((e: charms_parent_cat) => (
                    <ProgressTabs.Content key={e.id} value={e.id.toString()}>
                            <CharmsSubCat id={e.id} name={e.name}/>
                    </ProgressTabs.Content>
                ))}
            </ProgressTabs>
        </Container>
    );
};

export const config: RouteConfig = {
    link: {
        label: "Charms",
        icon: Sun,
    },
};

export default CustomPage;
