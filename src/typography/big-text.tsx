import { ComponentProps } from "react";

export const BigText: React.FC<ComponentProps<"p">> = (props) => {
    return (
        <p {...props} className={`text-3xl font-bold ${props.className}`}>
            {props.children}
        </p>
    );
}