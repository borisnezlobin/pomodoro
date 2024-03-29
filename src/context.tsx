import { useState, createContext, useEffect, useRef } from "react";
import ChildrenProps from "./utils/children-props";
import { formatAsStr } from "./utils/date-time";

type NotificationCreateRequest = {
    title: string,
    body?: string,
}

declare global {
    interface Window {
        api: {
            // idk, we'll see
            showNotification: (args: NotificationCreateRequest) => {},
            startDiscordRPC: (args: { session: Session }) => {},
            endDiscordRPC: () => {}
        };
    }
}

window.api.showNotification({ title: "whatever" })

export type Session = {
    type: "focus" | "break" | "none",
    status: "paused" | "current",
    length: number, // in ms
    start: number,
}

export type NullableSession = Session | null;

const EMPTY_SESSION: Session = {
    type: "none",
    length: 0,
    start: Date.now(),
    status: "current"
};

class SessionManager {
    private currentSession: NullableSession = null;
    private queuedSessions: Session[] = [];
    private currentTimeout: NodeJS.Timeout | null = null;
    private sessionEndCB: (newSession: NullableSession) => void;

    constructor({
        sessionEndCallback = (newSession: NullableSession) => { }
    }: {
        sessionEndCallback: (newSession: NullableSession) => void
    }) {
        this.sessionEndCB = sessionEndCallback;
        this.endCurrentSession = this.endCurrentSession.bind(this);
        this.endAllSessions = this.endAllSessions.bind(this);
    }

    getCurrentSession() { return this.currentSession; }

    setCurrentSession(newSession: Session) {
        if (this.currentSession) {
            const nextSession: Session = {
                type: this.currentSession.type,
                status: "paused",
                length: this.currentSession.length + this.currentSession.start - Date.now(),
                start: 0,
            }

            this.queuedSessions.push(nextSession);
        }

        this.startSession(newSession);
    }

    startSession(session: Session) {
        if (session.type === "none") {
            this.currentSession = null;
            return;
        }

        if (this.currentTimeout) clearTimeout(this.currentTimeout);

        this.currentSession = session;
        this.currentSession.status = "current";
        this.currentSession.start = Date.now();
        window.api.startDiscordRPC({ session: session });

        // TODO: check if timeout failed to be called due to laptop being off or something
        this.currentTimeout = setTimeout(() => {
            if (session.type == "focus") window.api.showNotification({
                title: "Session over!",
                body: "You were focused for " + formatAsStr(session.length),
            })
            this.endCurrentSession(true);
        }, this.currentSession.length);
    }

    startNextSession() {
        if (this.currentSession) return false;

        // can't read properties of undefined (reading "length")
        // when this function is called at the end of setTimeout
        if (this.queuedSessions.length !== 0) {
            // why does it think that this can be undefined? .pop only returns undefined if the array is empty... weird
            // anyways @ts-ignore fixes everything so w/e
            // @ts-ignore
            this.startSession(this.queuedSessions.pop());
            return true;
        }

        return false;
    }

    endCurrentSession(startNext: boolean) {
        console.log("ending session");
        if (!this.currentSession || this.currentTimeout === null) return;
        clearTimeout(this.currentTimeout);
        window.api.endDiscordRPC();
        this.currentSession = null;
        if (startNext) this.startNextSession();
        this.sessionEndCB(this.getCurrentSession());
        console.log("session ended, callback called, exiting.");
    }

    endAllSessions() {
        this.endCurrentSession(false);
        this.queuedSessions = [];
    }
}

export const CurrentSessionContext = createContext<{
    currentSession: NullableSession,
    setCurrentSession: (newSession: Session) => void,
    endCurrentSession: (start: boolean) => void,
    endAllSessions: () => void,
}>({
    currentSession: null,
    setCurrentSession: () => { },
    endCurrentSession: () => { },
    endAllSessions: () => { }
});

const CurrentSessionProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [currentSession, setCurrentSession] = useState<NullableSession>(null);
    const manager = useRef<SessionManager>(new SessionManager({
        sessionEndCallback: (newSession) => {
            console.log("updating context");
            setCurrentSession(newSession);
        }
    }));

    useEffect(() => {
        setCurrentSession(manager.current.getCurrentSession());
    }, [manager.current.getCurrentSession()]);

    const setCurrentSessionFr = (session: Session) => {
        console.log("starting new session and queuing current:");
        console.log(session);
        manager.current.setCurrentSession(session);
        setCurrentSession(manager.current.getCurrentSession());
    }

    const endCurrentSessionFr = (autostart: boolean) => {
        console.log("ending current session");
        manager.current.endCurrentSession(autostart);
    }

    return (
        <CurrentSessionContext.Provider value={{
            currentSession,
            setCurrentSession: setCurrentSessionFr,
            endCurrentSession: endCurrentSessionFr,
            endAllSessions: manager.current.endAllSessions
        }}>
            {children}
        </CurrentSessionContext.Provider>
    )
}

export const Providers: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <CurrentSessionProvider>
            {children}
        </CurrentSessionProvider>
    )
}