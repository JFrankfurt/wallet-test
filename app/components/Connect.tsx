"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import FunctionTile from "./functionTile";

export default function Connect() {
  const { address, isConnected } = useAccount();
  const { connect, error, status } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  return (
    <FunctionTile>
      <FunctionTile.Title>Connect a wallet</FunctionTile.Title>
      {status && <FunctionTile.Content>{status.toString()}</FunctionTile.Content>}
      {error && <FunctionTile.Content>{error.toString()}</FunctionTile.Content>}
      {isConnected && <FunctionTile.Content>{address}</FunctionTile.Content>}
      <FunctionTile.Button onClick={() => (isConnected ? disconnect() : connect())}>
        {isConnected ? "disconnect" : "connect"}
      </FunctionTile.Button>
    </FunctionTile>
  );
}
