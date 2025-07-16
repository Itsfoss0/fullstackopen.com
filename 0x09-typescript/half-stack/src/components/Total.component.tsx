import type { JSX } from "react";
import type { Totals } from "../types";

export default function Total (props: Totals): JSX.Element {
    return (
        <>
            <p>Number of exercises: {props.total}</p>
        </>
    )
}