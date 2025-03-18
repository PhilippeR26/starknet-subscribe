"use client";

import { useGlobalState } from "./globalContext";
import NewBlock from "./NewBlock";
import NewEvent from "./NewEvent";
import NewTx from "./NewTx";
import TxStatus from "./TxStatus";

export default function DisplayEvents() {
    const myWS = useGlobalState(state => state.wsProvider);

    return (
        <>
            {myWS && <> 
            <NewBlock></NewBlock>
            <NewTx></NewTx>
            <NewEvent></NewEvent>
            <TxStatus></TxStatus>
            </> }
        </>
    )
}