'use client'

import FunctionTile from './functionTile'

export default function ApproveERC20() {
  return (
    <FunctionTile>
      <FunctionTile.Title>Approve a spender</FunctionTile.Title>
      <label htmlFor="amount">
        <pre>amount</pre>
        <FunctionTile.Input type="number" id="amount" placeholder="amount" />
      </label>
      <label htmlFor="token-address">
        <pre>token address</pre>
        <FunctionTile.Input
          type="text"
          id="token-address"
          placeholder="token address"
        />
      </label>
      <FunctionTile.Button>approve</FunctionTile.Button>
    </FunctionTile>
  )
}
