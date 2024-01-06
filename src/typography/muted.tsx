import { ComponentProps } from "react";

export const Muted: React.FC<ComponentProps<"p">> = (props) => {
    return (
        <p {...props} className={"secondary-text " + props.className}>

        </p>
    )
}