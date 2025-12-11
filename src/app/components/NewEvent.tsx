"use client";
import { Box, Spinner } from "@chakra-ui/react"
import { useGlobalState } from "./globalContext";
import { useEffect, useRef, useState } from "react";
import { type EMITTED_EVENT } from "@starknet-io/types-js";
import { strkAddress } from "../utils/constants";
import type { Subscription, SubscriptionStarknetEventsEvent } from "starknet";



export default function NewEvent() {
  const myWS = useGlobalState(state => state.wsProvider);
  const [event, setEvent] = useState<EMITTED_EVENT | undefined>(undefined);
  const [counter, setCounter] = useState<number>(0);
  const counterRef = useRef<Function>(() => { }); // just to display in the console the counter value

  // increase the counter
  function increaseCounter() {
    setCounter(counter + 1); // counter is refreshed thanks to useRef()
    console.log("Events event", counter + 1, "=");
  };
  useEffect(() => { counterRef.current = increaseCounter }); // keep counter updated (not locked to the initial value)

  function getEvent(newEvent: EMITTED_EVENT) {
    counterRef.current(); // increase counter
    console.log(newEvent);
    setEvent(newEvent);
  };

  useEffect(() => {
    console.log("Subscribe Events...");
    let handlerNewEvents: SubscriptionStarknetEventsEvent;
    myWS!.subscribeEvents({ fromAddress: strkAddress }).then((resp: SubscriptionStarknetEventsEvent) => {
      handlerNewEvents = resp;
      console.log("Subscribe Events response =", resp);
      handlerNewEvents.on(getEvent);
      console.log("Subscribed for Events.");
    });
    return () => {
      console.log("Unsubscribe Events...");
      handlerNewEvents.unsubscribe().then(() => {
        console.log("Unsubscribed from newEvents.");

      });
    }
  },
    []
  );

  // function storeNewBlock(newHead: SubscriptionNewHeadsResponse) {
  //     console.log("newHead event =", newHead);
  //     setBlock(newHead);
  //   };

  // useEffect(() => {
  //   console.log("Subscribe newHeads...");
  //   let handlerNewHeads: Subscription;
  //   myWS!.subscribeNewHeads().then((resp: Subscription) => {
  //     handlerNewHeads = resp;
  //     console.log("Subscribe newHead response =", resp);
  //     handlerNewHeads.on(storeNewBlock);
  //     console.log("Subscribed for NewHeads.");
  //   });
  //   return () => {
  //     console.log("Unsubscribe newHeads...");
  //     handlerNewHeads.unsubscribe();
  //   }
  // },
  //   []
  // );


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
      {!event ? <>
        <Spinner color={"blue"}></Spinner> {" "}
        Fetching data
      </> : <>
        Last STRK token event #{counter}: from {event.from_address}<br></br>
        keys: {event.keys.toString()} <br></br>
        data: {event.data.toString()} <br></br>
      </>}
    </Box>
  )
}