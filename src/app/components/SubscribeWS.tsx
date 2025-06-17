"use client";

import { useState } from "react";
import { useGlobalState } from "./globalContext";
import InitWS from "./InitWS";
import NewBlock from "./NewBlock";
import NewEvent from "./NewEvent";
import NewTx from "./NewTx";
import TxStatus from "./TxStatus";
import { Button, Center } from "@chakra-ui/react";
import ConnectWS from "./ConnectWS";
import DisplayEvents from "./DisplayEvents";

export default function SubscribeWS() {
    const myWS = useGlobalState(state => state.wsProvider);
    const { isSubscribed, setIsSubscribed, setIsConnected } = useGlobalState(state => state);


    return (
        <>
            {!isSubscribed ?
                <>
                    <Center>
                        <Button
                            variant="surface"
                            fontWeight='bold'
                            mt={3}
                            px={5}
                            onClick={() => setIsConnected(false)}
                        >
                            Disconnect WebSocket
                        </Button>
                    </Center>
                    <Center>
                        <Button
                            variant="surface"
                            fontWeight='bold'
                            mt={3}
                            px={5}
                            onClick={() => setIsSubscribed(true)}
                        >
                            Subscribe events
                        </Button>
                    </Center>
                </> : <>
                    <DisplayEvents></DisplayEvents>
                </>
            }

        </>
    )
}