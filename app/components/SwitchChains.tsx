'use client'

import { useSwitchChain } from 'wagmi'
import FunctionTile from './functionTile'

export default function SwitchChains() {
  const { chains, error, switchChain } = useSwitchChain()
  return (
    <FunctionTile>
      <FunctionTile.Title>Switch Chains</FunctionTile.Title>
      {error && <FunctionTile.Content>{error.toString()}</FunctionTile.Content>}
      {chains.map((chain, i) => (
        <div key={chain.name + 'switch' + i}>
          <FunctionTile.H2>{chain.name}</FunctionTile.H2>
          {/* @ts-ignore */}
          <FunctionTile.Button onClick={() => switchChain({ chainId: chain.id })}>
            connect: {chain.name}
          </FunctionTile.Button>
        </div>
      ))}
    </FunctionTile>
  )
}
