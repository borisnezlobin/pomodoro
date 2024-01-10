import { CaretDown, CaretLeft, CaretUp, Pause, Play, Power, TrashSimple, X } from "@phosphor-icons/react"
import { BigText } from "../typography/big-text"
import { TextButton } from "../utils/text-button"
import { TimeLeft } from "../utils/time-left"
import { useContext, useState } from "react"
import { CurrentSessionContext, Session } from "../context"
import { Muted } from "../typography/muted"
import NoSession from "./main_components/no-session"
import FocusSession from "./main_components/focus-session"

export const MainPage = () => {
    const { currentSession, endAllSessions, endCurrentSession } = useContext(CurrentSessionContext);

    var content;

    if(currentSession == null || currentSession.type == "none" ){
        content = <NoSession />;
    } else if (currentSession.type == "focus"){
        content = <FocusSession />;
    } else if (currentSession.type == "break"){
        content = (
            <>
                <BigText className="text-5xl w-48 px-4">
                    <Muted className="text-sm text-left w-full">Break</Muted>
                    <TimeLeft className="code w-full text-left" />
                </BigText>
                <div className="w-48 mt-4 flex flex-col justify-start items-center">
                    <TextButton onClick={() => endCurrentSession(true)} className="w-full justify-start">
                        <CaretLeft weight="bold" />
                        Resume Focus
                    </TextButton>
                    <TextButton onClick={endAllSessions} className="w-full justify-start text-red-800">
                        <TrashSimple weight="bold" />
                        End Session
                    </TextButton>
                </div>
            </>
        )
    } else {
        content = (
            <>
                <BigText className="code">
                    Error!
                </BigText>
                <p>
                    Something unexpected happened, and we don't know what to do! Try restarting the app.
                </p>
            </>
        )
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center pt-8">
            {content}
        </div>
    )
}