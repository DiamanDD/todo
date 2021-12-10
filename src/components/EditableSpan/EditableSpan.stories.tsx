
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    component: EditableSpan,
    title: 'EditableSpan',
}

export const EditableSpanBaseExample = () => {
    return <>
        <div> <EditableSpan title={"Start value"} onChange={action("onChange")}/></div>

       <div> <EditableSpan title={"End value"} onChange={action("onChange")}/></div>
    </>;
}
