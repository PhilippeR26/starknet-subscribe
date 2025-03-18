"use client";
import { Box, Spinner } from "@chakra-ui/react"
import { useGlobalState } from "./globalContext";
import { useEffect, useState } from "react";
import { type SubscriptionTransactionsStatusResponse } from "@starknet-io/types-js";



export default function TxStatus() {

  const myWS = useGlobalState(state => state.wsProvider);
  const [newHeadID, setNewHeadID] = useState<bigint | undefined>(undefined);
  const [status, setStatus] = useState<SubscriptionTransactionsStatusResponse | undefined>(undefined);

  if (myWS) {
    myWS.onTransactionStatus = async function (st: SubscriptionTransactionsStatusResponse) {
      console.log("tx status event =", st);
      setStatus(st);
    };
  }

  useEffect(() => {
    console.log("Subscribe tx status...", myWS);
    myWS!.subscribeTransactionStatus("0x7f0dce88163f6565139d677f86ded8c396b449ed098272c6b06c5d2bddeae43").then((resp: number | false) => {
      if (!resp) {
        throw new Error("tx status subscription failed");
      }
      console.log("subscribe tx status response =", resp);
      setNewHeadID(BigInt(resp));
    });
    console.log("Subscribed for tx status.");
    return () => {
      console.log("Unsubscribe tx status...");
      myWS?.unsubscribeTransactionStatus().then((resp: boolean) => {
        console.log("Unsubscription tx status is", resp);
      }).catch((err:any)=>{
        console.log("Unsubscription tx status ", err);
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
        status of transaction : {JSON.stringify(status.result.status)}
      </>}
    </Box>
  )
}