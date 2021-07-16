import {AccordionTitle} from "./AccordionTitle";
import {AccordionBody} from "./AccordionBody";
import React from "react";
type AccordionPropsType={
    titleValue:string
    colapsed:boolean
}



export const Accordion = (props:AccordionPropsType) => {
    if (props.colapsed==true){
        return (
            <>
                <AccordionTitle title={props.titleValue}/>

            </>
        )
    }

    return (
        <>
            <AccordionTitle title={props.titleValue}/>
            <AccordionBody />
        </>
    )
}