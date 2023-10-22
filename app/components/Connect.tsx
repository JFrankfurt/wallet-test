"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import FunctionTile from "./functionTile";

export default function Connect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  return (
    <FunctionTile>
      <FunctionTile.Title>Connect a wallet</FunctionTile.Title>
      {isConnected && <pre>{address}</pre>}
      <FunctionTile.Button onClick={() => (isConnected ? disconnect : connect)}>
        {isConnected ? "disconnect" : "connect"}
      </FunctionTile.Button>
    </FunctionTile>
  );
}
