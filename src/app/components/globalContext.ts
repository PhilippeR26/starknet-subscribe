"use client";
import type { WebSocketChannel } from "starknet";
import { create } from "zustand";


interface FrontEndState {
    wsProvider: WebSocketChannel | undefined,
    setWsProvider: (ws: WebSocketChannel) => void,
    isConnected: boolean,
    setIsConnected: (isConnected: boolean) => void,
    isSubscribed: boolean,
    setIsSubscribed: (isSubscribed: boolean) => void,
}

export const useGlobalState = create<FrontEndState>()(set => ({
    wsProvider: undefined,
    setWsProvider: (ws: WebSocketChannel) => { set(state => ({ wsProvider: ws })) },
    isConnected: false,
    setIsConnected: (isConnected: boolean) => { set(state => ({ isConnected })) },
    isSubscribed: false,
    setIsSubscribed: (isSubscribed: boolean) => { set(state => ({ isSubscribed })) },
}));
