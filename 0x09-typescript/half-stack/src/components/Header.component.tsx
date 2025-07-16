import type { JSX } from "react";
import type { CourseInfo } from "../types";

export default function CourseHeader(props: CourseInfo): JSX.Element {

    return (
        <>
            <h1>{props.name}</h1>
        </>
    )
    
}