"use client";
import { Box, Spinner } from "@chakra-ui/react"
import { useGlobalState } from "./globalContext";
import { useEffect, useRef, useState } from "react";
import { type TXN_WITH_HASH } from "@starknet-io/types-js";
import { formatBalance } from "../utils/utils";
import { json, type Subscription, type SubscriptionNewTransactionEvent, type TXN_HASH } from "starknet";



export default function NewTx() {

  const myWS = useGlobalState(state => state.wsProvider);
  const [tx, setTx] = useState<TXN_HASH | TXN_WITH_HASH | undefined>(undefined);
  const [counter, setCounter] = useState<number>(0);
  const counterRef = useRef<Function>(() => { });

  // increase the counter
  function increaseCounter() {
    setCounter(counter + 1); // counter is refreshed thanks to useRef()
    console.log("newTx", counter + 1, "=");
  };
  useEffect(() => { counterRef.current = increaseCounter }); // keep counter updated

  function getEvent(newTx: TXN_HASH | TXN_WITH_HASH) {
    counterRef.current(); // increase counter
    console.log(newTx);
    setTx(newTx);
  };

  useEffect(() => {
    console.log("Subscribe newTx...");
    let handlerNewTx: SubscriptionNewTransactionEvent;
    myWS!.subscribeNewTransactions({finalityStatus:["PRE_CONFIRMED"]}).then((resp: SubscriptionNewTransactionEvent) => {
      handlerNewTx = resp;
      console.log("Subscribe newTx response =", resp);
      handlerNewTx.on(getEvent);
      console.log("Subscribed for newTx.");
    });
    return () => {
      console.log("Unsubscribe newTx...");
      handlerNewTx.unsubscribe().then(() => {
        console.log("Unsubscribed from newTx.");
       });
    }
  },
    []
  );


  return (
    <Box
      borderColor="black"
      borderWidth="1px"
      borderRadius="0"
      bg='gray.800'
      opacity="95%"
      p="1"
      my="2"
      textAlign={'center'}
      fontSize="12"
      fontWeight="normal"
      fontFamily={"monospace"}
      color="white"
    >
      {!tx ? <>
        <Spinner color={"blue"}></Spinner> {" "}
        Fetching data
      </> : <>
        last pending transaction #{counter}: {json.stringify(tx)}<br></br>

      </>}
    </Box>
  )
}