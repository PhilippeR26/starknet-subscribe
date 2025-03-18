"use client";
import { Box, Spinner } from "@chakra-ui/react"
import { useGlobalState } from "./globalContext";
import { useEffect, useState } from "react";
import { SubscriptionNewHeadsResponse, type SubscriptionPendingTransactionsResponse } from "@starknet-io/types-js";
import { formatBalance } from "../utils/utils";



export default function NewTx() {

  const myWS = useGlobalState(state => state.wsProvider);
  const [newTxID, setNewTxID] = useState<bigint | undefined>(undefined);
  const [tx, setTx] = useState<SubscriptionPendingTransactionsResponse | undefined>(undefined);
  const [counter, setCounter] = useState<number>(0);

  if (myWS) {
    myWS.onPendingTransaction = async function (newTx: SubscriptionPendingTransactionsResponse) {
      console.log("pending Tx event", counter, "=", newTx);
      setTx(newTx);
      setCounter(counter + 1);
    };
  }

  useEffect(() => {
    console.log("Subscribe pending tx...");
    myWS!.subscribePendingTransaction().then((resp: number | false) => {
      if (!resp) {
        throw new Error("pending tx subscription failed");
      }
      console.log("subscribe pending tx response =", resp);
      setNewTxID(BigInt(resp));
    });
    console.log("Subscribed for pending tx.");
    return () => {
      console.log("Unsubscribe pending tx...");
      myWS?.unsubscribePendingTransaction().then((resp: boolean) => {
        console.log("Unsubscription pending tx is", resp);
      }).catch((err: any) => {
        console.log("Unsubscription pending tx ", err);
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
        last pending transaction #{counter}: {tx.result.toString()}<br></br>

      </>}
    </Box>
  )
}