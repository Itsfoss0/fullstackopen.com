import type { JSX } from "react";
import type { CoursePart } from "../types";

export default function Content(props: CoursePart): JSX.Element {
    return (
        <p>{props.name}: {props.exerciseCount}</p>
    )
    
}