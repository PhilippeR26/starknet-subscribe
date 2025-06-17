"use client";

import { useGlobalState } from "./globalContext";
import NewBlock from "./NewBlock";
import NewEvent from "./NewEvent";
import NewTx from "./NewTx";
import TxStatus from "./TxStatus";
import { Button, Center } from "@chakra-ui/react";

export default function SubscribeWS() {
    const myWS = useGlobalState(state => state.wsProvider);
    const { isSubscribed, setIsSubscribed, setIsConnected } = useGlobalState(state => state);


    return (
        <>
            <Center>
                <Button
                    variant="surface"
                    fontWeight='bold'
                    mb={3}
                    px={5}
                    onClick={() => setIsSubscribed(false)}
                >
                    Unsubscribe events
                </Button>
            </Center>
            {myWS && <>
                <NewBlock></NewBlock>
                <NewTx></NewTx>
                <NewEvent></NewEvent>
                <TxStatus></TxStatus>
            </>}
        </>
    )
}