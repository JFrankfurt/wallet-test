import { createConfig, http } from 'wagmi'
import { base, mainnet, bitTorrent } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base, bitTorrent, mainnet],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
    [bitTorrent.id]: http(),
    [mainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
