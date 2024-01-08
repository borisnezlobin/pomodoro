import { useContext, useState } from "react";
import { BigText } from "../../typography/big-text";
import { Muted } from "../../typography/muted";
import { Modal } from "../../utils/modal";
import { TextButton } from "../../utils/text-button";
import { CurrentSessionContext, Session } from "../../context";
import { CaretDown, CaretUp, Play, X } from "@phosphor-icons/react";
import { formatAsStr } from "../../utils/date-time";

const MIN = 1;
const MAX = 24 * 60;

const NoSession = () => {
    const { currentSession, setCurrentSession, endCurrentSession } = useContext(CurrentSessionContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [sessionLength, setSessionLength] = useState(15);

    const startSession = () => {
        const newSession: Session = {
            type: "focus",
            status: "current",
            length: sessionLength * 1_000 * 60,
            start: Date.now() 
        };
        console.log(newSession);
        setCurrentSession(newSession);
        setModalOpen(false);
    }

    return (
        <>
            <BigText className="code">
                No Session Started
            </BigText>
            <TextButton onClick={() => setModalOpen(true)} className="text-lg py-6 rounded-lg mt-2">
                <Play weight="fill" />
                Start one
            </TextButton>

            <Modal open={modalOpen} modalClassName="flex flex-col justify-center items-start w-4/5 h-4/5 max-w-[600px] max-h-[200px] min-w-[280px]">
                <BigText className="text-lg">How long will this focus be?</BigText>
                <Muted>You can take breaks during the session.</Muted>
                <div className="flex flex-col justify-center items-center my-4">
                    <BigText>
                        <input
                            value={sessionLength}
                            type="number"
                            min={MIN}
                            max={MAX}
                            onChange={(e) => {
                                setSessionLength(parseInt(e.target.value));
                            }}
                            className="text-center code border-b border-gray-800"
                        />
                        <span className="ml-4 code text-lg">minute{sessionLength == 1 ? "" : "s"}</span>
                    </BigText>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <TextButton onClick={() => setModalOpen(false) }>
                        <X weight="bold" />
                        Cancel
                    </TextButton>

                    <TextButton onClick={startSession}>
                        <Play weight="bold" />
                        Start Session
                    </TextButton>
                </div>
            </Modal>
        </>
    )
};

export default NoSession;