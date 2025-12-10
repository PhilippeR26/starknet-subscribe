"use client";
import { Box, Spinner } from "@chakra-ui/react"
import { useGlobalState } from "./globalContext";
import { useEffect, useRef, useState } from "react";
import { type BLOCK_HEADER } from "@starknet-io/types-js";
import type { Subscription, SubscriptionNewHeadsEvent } from "starknet";



export default function NewBlock() {

  const myWS = useGlobalState(state => state.wsProvider);
  const [block, setBlock] = useState<BLOCK_HEADER | undefined>(undefined);

  function storeNewBlock(newHead: BLOCK_HEADER) {
    console.log("newHead event =", newHead);
    setBlock(newHead);
  };

  useEffect(() => {
    console.log("Subscribe newHeads...");
    let handlerNewHeads: Subscription;
    myWS!.subscribeNewHeads().then((resp: SubscriptionNewHeadsEvent) => {
      handlerNewHeads = resp;
      console.log("Subscribe newHead response =", resp);
      handlerNewHeads.on(storeNewBlock);
      console.log("Subscribed for NewHeads.");
    });
    return () => {
      console.log("Unsubscribe newHeads...");
      handlerNewHeads.unsubscribe().then(() => {
        console.log("Unsubscribed from newHeads.");
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
        Block number: {block.block_number.toString()}<br></br>
        Time: {(new Date(block.timestamp * 1000)).toISOString()}<br></br>
        Starknet version: {block.starknet_version}<br></br>
        L1 Ethereum data availability mode: {block.l1_da_mode}<br></br>
        L1 data gas price: {BigInt(block.l1_data_gas_price.price_in_fri).toString() + " "}FRI, {BigInt(block.l1_data_gas_price.price_in_wei).toString() + " "}WEI <br></br>
        L1 gas price: {BigInt(block.l1_gas_price.price_in_fri).toString() + " "}FRI, {BigInt(block.l1_gas_price.price_in_wei).toString() + " "}WEI <br></br>
        L2 gas price: {BigInt(block.l2_gas_price.price_in_fri).toString() + " "}FRI, {BigInt(block.l2_gas_price.price_in_wei).toString() + " "}WEI <br></br>
      </>}
    </Box>
  )
}