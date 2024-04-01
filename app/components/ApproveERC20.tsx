'use client'

import { useCallback, useMemo, useState } from 'react'
import FunctionTile from './functionTile'
import { useChainId, useWriteContract } from 'wagmi'
import { isAddress } from 'viem'

// https://www.alchemy.com/smart-contracts/tokenerc20
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]

export default function ApproveERC20() {
  const { writeContract } = useWriteContract()
  const [amount, setAmount] = useState('')
  const chainId = useChainId()
  

  const usdcAddress = useMemo(() => {
    switch (chainId) {
      case 1:
        return '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      case 8453:
        return '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
    }
  }, [chainId])
  const uniswapRouterAddress = useMemo(() => {
    switch (chainId) {
      case 1:
        return '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD'
      case 8453:
        return '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD'
    }
  }, [chainId])

  const approve = useCallback(() => {
    if (!isAddress(usdcAddress || '') || !usdcAddress || !amount) {
      return
    }
    writeContract({
      abi,
      address: usdcAddress,
      functionName: 'approve',
      args: [
        uniswapRouterAddress,
        BigInt(amount) * 10n ** 6n
      ]
    })
  }, [amount, uniswapRouterAddress, usdcAddress, writeContract])


  return (
    <FunctionTile>
      <FunctionTile.Title>Approve a spender</FunctionTile.Title>
      <FunctionTile.Content>

      <label htmlFor="amount">
        <pre>amount</pre>
        <FunctionTile.Input type="number" id="amount" placeholder="amount" value={amount} onChange={({target: {value}}) => setAmount(value)} />
      </label>
        <div>token address (USDC): {usdcAddress}</div>
        <div>spender (Uniswap router): {uniswapRouterAddress}</div>
      </FunctionTile.Content>
      <FunctionTile.Button onClick={approve} disabled={!amount}>approve</FunctionTile.Button>
    </FunctionTile>
  )
}
