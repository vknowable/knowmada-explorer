import { getLastBlock, getBlockAtHeight } from "@/lib/getBlock";
import { truncateHash, timeAgo } from "@/lib/helpers";

import Link from "next/link";

export default async function Blocks() {
  const numBlocks = 20

  // get the numBlocks most recent blocks for display
  // fetch the last block first, to have a starting height
  const lastBlockData: Promise<BlockResponse> = getLastBlock()
  const lastBlock = await lastBlockData

  // fetch the remaining most recent blocks
  const lastHeight: number = parseInt(lastBlock.header.height)
  const blocksPromisesArray: Promise<BlockResponse>[] = []

  for (let i = lastHeight - 1; i >= lastHeight - (numBlocks-1); i--) {
    blocksPromisesArray.push(getBlockAtHeight(i))
  }

  const recentBlocks: BlockResponse[] = await Promise.all(blocksPromisesArray);
  recentBlocks.unshift(lastBlock)

  return (
    <div className="grid min-h-screen place-items-center p-10 bg-dots ml-4">
      {/* Latest Blocks table */}
      <div className="col-span-2 lg:col-span-1 w-full bg-dark/90 border border-light/10 rounded-md p-8">
        <div className="flex justify-between items-baseline">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Latest Blocks</h3>
          {/* <Link className="text-yellow hover:text-yellow/50" href={'/blocks/'}>See More</Link> */}
        </div>

        <table className="min-w-full bg-black border border-light">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Height</th>
              <th className="py-2 px-4 border-b text-left">Proposer</th>
              <th className="py-2 px-4 border-b text-left">Hash</th>
              <th className="py-2 px-4 border-b text-left">Txs</th>
              <th className="py-2 px-4 border-b text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentBlocks.map(block => 
              <tr key={block.block_id}>
                <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/blocks/${block.header.height}`}>{block.header.height}</Link></td>
                <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/validators/${block.header.proposer_address}`}>{truncateHash(block.header.proposer_address)}</Link></td>
                <td className="py-2 px-4 border-b">{truncateHash(block.block_id)}</td>
                <td className="py-2 px-4 border-b">{block.tx_hashes.length}</td>
                <td className="py-2 px-4 border-b">{timeAgo(block.header.time)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
