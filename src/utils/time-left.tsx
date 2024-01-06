import { ComponentProps, useContext, useEffect, useState } from "react";
import { CurrentSessionContext } from "../context";
import { formatMMSS } from "./date-time";

export const TimeLeft: React.FC<ComponentProps<"p">> = (props) => {
    const { currentSession } = useContext(CurrentSessionContext);
    const time = currentSession == null ? 0 : currentSession.length + currentSession.start - Date.now()

    const [timeLeftInCurrentSession, setTimeLeft] = useState(time);

    useEffect(() => {
        if(currentSession === null) return;
        if(currentSession.type === "break" || currentSession.type === "focus"){
            const interval = setInterval(() => {
                setTimeLeft(currentSession.length + currentSession.start - Date.now());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [currentSession]);

    if(currentSession === null) return (<></>); // >.<

    return (
        <span {...props} className={props.className}>
            {formatMMSS(timeLeftInCurrentSession)}
        </span>
    )
}