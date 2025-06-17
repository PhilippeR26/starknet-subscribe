"use client";

import { useState } from "react";
import { useGlobalState } from "./globalContext";
import InitWS from "./InitWS";
import NewBlock from "./NewBlock";
import NewEvent from "./NewEvent";
import NewTx from "./NewTx";
import TxStatus from "./TxStatus";
import { Button, Center } from "@chakra-ui/react";
import SubscribeWS from "./SubscribeWS";

export default function ConnectWS() {
    const myWS = useGlobalState(state => state.wsProvider);
    const { isConnected, setIsConnected } = useGlobalState(state => state);


    return (
        <>
            {!isConnected ?
                <>
                    <Center>
                        <Button
                            variant="surface"
                            fontWeight='bold'
                            mt={3}
                            px={5}
                            onClick={() => setIsConnected(true)}
                        >
                            Connect WebSocket
                        </Button>
                    </Center>
                </> : <>
                    <InitWS></InitWS>
                    <SubscribeWS></SubscribeWS>
                </>
            }



        </>
    )
}