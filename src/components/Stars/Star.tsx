import React from "react";
type StarPropsType={
    selected:boolean
}

export function Star(props:StarPropsType) {
    if (props.selected === false){
        return (<span>sta1 </span>
        )

    }
    else {
        return (<span><b>star </b></span>
        )
    }




}