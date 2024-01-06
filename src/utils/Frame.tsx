import { Activity, Placeholder, Timer } from "@phosphor-icons/react";
import { Muted } from "../typography/muted";
import { useContext } from "react";
import { CurrentSessionContext } from "../context";
import { TimeLeft } from "./time-left";


export const Frame: React.FC = () => {
    const { currentSession } = useContext(CurrentSessionContext);

    var content;

    if(currentSession == null || currentSession.type == 'none'){
        content = (
            <>
                <Placeholder className="text-secondary text-sm" />
                <Muted className="text-sm">
                    No session started
                </Muted>
            </>
        )
    }else if(currentSession.type === "break"){
        content = (
            <>
                <Timer className="text-secondary text-sm" />
                <Muted className="text-sm">
                    Break ending in <TimeLeft />
                </Muted>
            </>
        )
    }else if(currentSession.type === "focus") {
        content = (
            <>
                <Activity className="text-secondary text-sm" />
                <Muted className="code text-sm">
                    Connected to Discord
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