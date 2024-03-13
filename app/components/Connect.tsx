'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import FunctionTile from './functionTile'

export default function Connect() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, error, status } = useConnect()
  const { disconnect } = useDisconnect()
  return (
    <FunctionTile>
      <FunctionTile.Title>Connect a wallet</FunctionTile.Title>
      {status && (
        <FunctionTile.Content>{status.toString()}</FunctionTile.Content>
      )}
      {error && <FunctionTile.Content>{error.toString()}</FunctionTile.Content>}
      {isConnected && <FunctionTile.Content>{address}</FunctionTile.Content>}
      {connectors.map((connector, i) => (
        <div key={connector.uid + 'connect' + i}>
          <FunctionTile.H2>{connector.name}</FunctionTile.H2>
          <FunctionTile.Button onClick={() => connect({ connector })}>
            connect: {connector.name}
          </FunctionTile.Button>
          <FunctionTile.Button onClick={() => disconnect({ connector })}>
            disconnect: {connector.name}
          </FunctionTile.Button>
        </div>
      ))}
    </FunctionTile>
  )
}
