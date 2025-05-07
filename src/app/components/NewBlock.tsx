"use client";
import { Box, Spinner } from "@chakra-ui/react"
import { useGlobalState } from "./globalContext";
import { useEffect, useState } from "react";
import { type SubscriptionNewHeadsResponse } from "@starknet-io/types-js";



export default function NewBlock() {

  const myWS = useGlobalState(state => state.wsProvider);
  const [newHeadID, setNewHeadID] = useState<bigint | undefined>(undefined);
  const [block, setBlock] = useState<SubscriptionNewHeadsResponse | undefined>(undefined);

  if (myWS) {
    myWS.onNewHeads = async function (newHead: SubscriptionNewHeadsResponse) {
      console.log("newHead event =", newHead);
      setBlock(newHead);
    };
  }

  useEffect(() => {
    console.log("Subscribe newHeads...");
    myWS!.subscribeNewHeads().then((resp: string | false) => {
      if (!resp) {
        throw new Error("newHead subscription failed");
      }
      console.log("subscribe newHead response =", resp);
      setNewHeadID(BigInt(resp));
    });
    console.log("Subscribed for NewHeads.");
    return () => {
      console.log("Unsubscribe newHeads...");
      myWS?.unsubscribeNewHeads().then((resp: boolean) => {
        console.log("Unsubscription newHeads is", resp);
      }).catch((err:any)=>{
        console.log("Unsubscription newHeads ", err);
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
      {!block ? <>
        <Spinner color={"blue"}></Spinner> {" "}
        Fetching data
      </> : <>
        Block number: {block.result.block_number}<br></br>
        Time: {(new Date(block.result.timestamp*1000)).toISOString()}<br></br>
        Starknet version: {block.result.starknet_version}<br></br>
        L1 Ethereum data availability mode: {block.result.l1_da_mode}<br></br>
        L1 data gas price: {BigInt(block.result.l1_data_gas_price.price_in_fri).toString()+" "}FRI, {BigInt(block.result.l1_data_gas_price.price_in_wei).toString()+" "}WEI <br></br>
        L1 gas price: {BigInt(block.result.l1_gas_price.price_in_fri).toString()+" "}FRI, {BigInt(block.result.l1_gas_price.price_in_wei).toString()+" "}WEI <br></br>
        L2 gas price: {BigInt(block.result.l2_gas_price.price_in_fri).toString()+" "}FRI, {BigInt(block.result.l2_gas_price.price_in_wei).toString()+" "}WEI <br></br>
      </>}
    </Box>
  )
}