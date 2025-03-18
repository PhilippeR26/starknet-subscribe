"use client";
import type { WebSocketChannel } from "starknet";
import { create } from "zustand";


interface FrontEndState {
    wsProvider: WebSocketChannel | undefined,
    setWsProvider: (ws: WebSocketChannel) => void,
}

export const useGlobalState = create<FrontEndState>()(set => ({
    wsProvider: undefined,
    setWsProvider: (ws: WebSocketChannel) => { set(state => ({ wsProvider: ws })) }
}));
