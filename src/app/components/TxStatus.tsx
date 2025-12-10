"use client";
import { Box, Spinner } from "@chakra-ui/react"
import { useGlobalState } from "./globalContext";
import { useEffect, useState } from "react";
import { type NEW_TXN_STATUS } from "@starknet-io/types-js";
import type { Subscription, SubscriptionTransactionStatusEvent } from "starknet";



export default function TxStatus() {

  const myWS = useGlobalState(state => state.wsProvider);
  const [status, setStatus] = useState<NEW_TXN_STATUS | undefined>(undefined);


  function storeTxStatus(newTxStatus: NEW_TXN_STATUS) {
    console.log("txStatus event", "=", newTxStatus);
    setStatus(newTxStatus);
  };

  useEffect(() => {
    console.log("Subscribe txStatus...");
    let handlerNewTxStatus: SubscriptionTransactionStatusEvent;
    myWS!.subscribeTransactionStatus({ transactionHash: "0x7f0dce88163f6565139d677f86ded8c396b449ed098272c6b06c5d2bddeae43" }).then((resp: SubscriptionTransactionStatusEvent) => {
      handlerNewTxStatus = resp;
      console.log("Subscribe txStatus response =", resp);
      handlerNewTxStatus.on(storeTxStatus);
      console.log("Subscribed for txStatus.");
    });
    return () => {
      console.log("Unsubscribe txStatus...");
      handlerNewTxStatus.unsubscribe().then(() => {
        console.log("Unsubscribed from TxStatus.");

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
      textAlign={'center'}
      fontSize="12"
      fontWeight="normal"
      fontFamily={"monospace"}
      color="white"
    >
      {!status ? <>
        <Spinner color={"blue"}></Spinner> {" "}
        Fetching data
      </> : <>
        status of transaction : {JSON.stringify(status.status)}
      </>}
    </Box>
  )
}