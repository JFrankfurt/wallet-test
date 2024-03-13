'use client'

import FunctionTile from './functionTile'

export default function RevokeApproval() {
  return (
    <FunctionTile>
      <FunctionTile.Title>Revoke an approval</FunctionTile.Title>
      <label htmlFor="token-address">
        <pre>token address</pre>
        <FunctionTile.Input
          type="text"
          id="token-address"
          placeholder="token address"
        />
      </label>
      <FunctionTile.Button>revoke</FunctionTile.Button>
    </FunctionTile>
  )
}
