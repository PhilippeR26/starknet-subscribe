"use client";
import { useEffect } from 'react';
import { useGlobalState } from './globalContext';
import { WebSocketChannel } from 'starknet';

export default function InitWS() {
  const wsProvider = useGlobalState(state => state.wsProvider);
  const setWsProvider = useGlobalState((state) => state.setWsProvider);

  useEffect(() => {
    const wsURL = process.env.NEXT_PUBLIC_WS_PROVIDER??"";
    console.log("Connection of websocket...");
    const myWS = new WebSocketChannel({ nodeUrl: wsURL });
    // console.log("WS connection response :",myWS);
    myWS.waitForConnection().then((resp: any) => {
      console.log("Is connected WS =", myWS.isConnected());
      setWsProvider(myWS);
    }).catch((error: any) => {
      throw new Error("Error connection WebSocket:", error.message);
    })

    return () => {
      console.log("Disconnect websocket...");
      myWS?.disconnect();
      console.log("WebSocket disconnected.");
    }
  },
    []
  );

  return <></>
}
