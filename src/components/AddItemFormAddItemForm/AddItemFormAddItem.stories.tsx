import {AddItemFormAddItem} from "./AddItemFormAddItem";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";

export default {
    title: "AddItemFormAddItem",
    component: AddItemFormAddItem,
    argTypes: {
        newTasks: {onclick: "clickButton"}
    },

} as ComponentMeta<typeof AddItemFormAddItem>
const Template: ComponentStory<typeof AddItemFormAddItem> = (args) => <AddItemFormAddItem {...args} />;
export const AddItemFormAddItemBase = Template.bind({});
AddItemFormAddItemBase.args = {
    newTasks: action("click add")
}
