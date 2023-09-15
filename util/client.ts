import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// 2. Set up your client with desired chain & transport.
export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
