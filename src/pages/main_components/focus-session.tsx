import { useContext, useState } from "react";
import { BigText } from "../../typography/big-text";
import { Muted } from "../../typography/muted";
import { Modal } from "../../utils/modal";
import { TextButton } from "../../utils/text-button";
import { CurrentSessionContext, Session } from "../../context";
import { CaretDown, CaretUp, Pause, Play, Power, X } from "@phosphor-icons/react";
import { TimeLeft } from "../../utils/time-left";
import { formatAsStr, formatMMSS } from "../../utils/date-time";

const MIN = 1;
const MAX = 30;

const FocusSession = () => {
    const { currentSession, setCurrentSession, endCurrentSession } = useContext(CurrentSessionContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [breakLength, setBreakLength] = useState(15);

    if(currentSession == null){
        return <></>;
    }

    const startBreak = () => {
        const newSession: Session = {
            type: "break",
            status: "current",
            length: breakLength * 1_000 * 60,
            start: Date.now() 
        };
        setCurrentSession(newSession);
        setModalOpen(false);
    }

    return (
        <>
            <BigText className="text-5xl w-48 px-4">
                <Muted className="text-base w-48">Focus</Muted>
                <TimeLeft className="code w-48 text-left" />
            </BigText>
            <div className="mt-4 w-48 flex flex-col justify-start items-center">
                <TextButton onClick={() => {
                    console.log("opened modal");
                    setModalOpen(true)
                }} className="w-full justify-start">
                    <Pause weight="bold" />
                    Pause
                </TextButton>
                <TextButton onClick={() => endCurrentSession(false)} className="w-full justify-start text-red-800">
                    <Power weight="bold" />
                    Quit
                </TextButton>
            </div>

            <Modal open={modalOpen} modalClassName="flex flex-col justify-center items-start w-4/5 h-4/5 max-w-[600px] max-h-[200px] min-w-[280px]">
                <BigText className="text-lg">How long will this break be?</BigText>
                <Muted>You've been focused for <span className="code">{formatAsStr(Date.now() - currentSession.start)}</span></Muted>
                <div className="flex flex-col justify-center items-center my-4">
                    <BigText>
                        <input
                            value={breakLength}
                            type="number"
                            min={MIN}
                            max={MAX}
                            onChange={(e) => {
                                setBreakLength(parseInt(e.target.value));
                            }}
                            className="text-center code border-b border-gray-800"
                        />
                        <span className="ml-4 code text-lg">minutes</span>
                    </BigText>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <TextButton onClick={() => setModalOpen(false) }>
                        <X weight="bold" />
                        Cancel
                    </TextButton>

                    <TextButton onClick={startBreak}>
                        <Play weight="bold" />
                        Start Break
                    </TextButton>
                </div>
            </Modal>
        </>
    )
};

export default FocusSession;