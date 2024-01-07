import { Activity, Placeholder, Timer } from "@phosphor-icons/react";
import { Muted } from "../typography/muted";
import { useContext } from "react";
import { CurrentSessionContext } from "../context";
import { TimeLeft } from "./time-left";
import { Separator } from "./separator";


export const Frame: React.FC = () => {
    const { currentSession } = useContext(CurrentSessionContext);

    var content;

    if (currentSession == null || currentSession.type == 'none') {
        content = (
            <>
                <Placeholder className="text-secondary text-sm" />
                <Muted className="text-sm flex flex-row justify-center items-center">
                    Tomat <Separator size="small" /> No Session Started
                </Muted>
            </>
        )
    } else if (currentSession.type === "break") {
        content = (
            <>
                <Timer className="text-secondary text-sm" />
                <Muted className="text-sm flex flex-row justify-center items-center">
                    Tomat <Separator size="small" /> Break Ending in <TimeLeft className="ml-2" />
                </Muted>
            </>
        )
    } else if (currentSession.type === "focus") {
        content = (
            <>
                <Activity className="text-secondary text-sm" />
                <Muted className="text-sm flex flex-row justify-center items-center">
                    Tomat <Separator size="small" /> Connected to Discord
                </Muted>
            </>
        )
    }

    return (
        <div
            className={`draggable transition w-full flex h-10 absolute ml-20 z-10 flex-row justify-start gap-2 items-center`}
        >
            {content}
        </div>
    )
}