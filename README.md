# Starknet-subscribe-DAPP

A small DAPP demonstrating the Starknet websocket subscriptions.

<p align="center">
  <img src="./public/subscribeDAPP.png" />
</p>

You can subscribe to Websocket messages sent by your rpc 0.8 node.
You can ask to your node to send automatically a message each time:
- a new block is created.
- a transaction has changed its status.
- a contract has generated a new event.
- a new transaction has been added in the pending block.

## Launch
The test DAPP is deployed [here]().

## Local execution
Add at the root a `.env` file, including `NEXT_PUBLIC_WS_PROVIDER=`, and add the url of your websocket server.  
Launch with `npm run dev`
