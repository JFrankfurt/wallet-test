import { configureChains, createConfig } from 'wagmi'
import { base, sepolia, mainnet } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { alchemyProvider } from 'wagmi/providers/alchemy'


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, base, ...(process.env.NODE_ENV === 'development' ? [sepolia] : [])],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY! }),
  ],
)


export const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({chains})],
  publicClient,
  webSocketPublicClient,
})

export { chains }
