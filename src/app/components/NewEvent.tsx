"use client";
import { Box, Spinner } from "@chakra-ui/react"
import { useGlobalState } from "./globalContext";
import { useEffect, useState } from "react";
import { type SubscriptionEventsResponse, type SubscriptionPendingTransactionsResponse } from "@starknet-io/types-js";
import { strkAddress } from "../utils/constants";



export default function NewEvent() {

  const myWS = useGlobalState(state => state.wsProvider);
  const [newEvent, setNewEventID] = useState<bigint | undefined>(undefined);
  const [event, setEvent] = useState<SubscriptionEventsResponse | undefined>(undefined);
  const [counter, setCounter] = useState<number>(0);

  if (myWS) {
    myWS.onEvents = async function (newEvent: SubscriptionEventsResponse) {
      console.log("Events event", counter, "=", newEvent);
      setEvent(newEvent);
      setCounter(counter + 1);
    };
  }

  useEffect(() => {
    console.log("Subscribe events...", myWS);
    myWS!.subscribeEvents(strkAddress).then((resp: number | false) => {
      if (!resp) {
        throw new Error("Events subscription failed");
      }
      console.log("subscribe events response =", resp);
      setNewEventID(BigInt(resp));
    });
    console.log("Subscribed for Events.");
    return () => {
      console.log("Unsubscribe Events...");
      myWS?.unsubscribeEvents().then((resp: boolean) => {
        console.log("Unsubscription Events is", resp);
      }).catch((err: any) => {
        console.log("Unsubscription Events ", err);
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
      {!event ? <>
        <Spinner color={"blue"}></Spinner> {" "}
        Fetching data
      </> : <>
        Last STRK token event #{counter}: from {event.result.from_address}<br></br>
        keys: {event.result.keys.toString()} <br></br>
        data: {event.result.data.toString()} <br></br>
      </>}
    </Box>
  )
}