import { getLastBlock, getBlockAtHeight } from "@/lib/getBlock";
import { truncateHash, timeAgo } from "@/lib/helpers";

import Link from "next/link";

export default async function Home() {

  const numBlocks = 10
  const numTxs = 10

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

  // use the recent block data to fill out the list of numTxs most recent txs
  const recentTxs: TxSummary[] = []
  for (const block of recentBlocks) {
    for (const tx of block.tx_hashes) {
      recentTxs.push({
        height: block.header.height,
        time: block.header.time,
        hash_id: tx.hash_id,
        tx_type: tx.tx_type,
        result: "Ok" // TODO: not sure how to properly check for this?
      })
      if (recentTxs.length >= numTxs) break
    }
    if (recentTxs.length >= numTxs) break
  }

  return (
    <main className="grid grid-cols-[auto,auto] grid-rows-[auto,auto,auto,auto,auto] gap-8 min-h-screen place-items-center">
      <div className="col-span-2 lg:col-span-1">Active validators: 100 out of 200 validators</div>
      <div className="col-span-2 lg:col-span-1">Latest block: {recentBlocks[0].header.height}</div>
      <div className="col-span-2">123445 native bonded, 23%; 3325255 native unbonded, 44% ........ | pie chart bonded/unbonded/unbonding| </div>

      {/* Latest Blocks table */}
      <div className="col-span-2 lg:col-span-1">
        <div className="flex justify-between items-baseline">
          <h3 className="text-xl font-bold">Latest Blocks</h3>
          <Link className="text-blue-500" href={'blocks/'}>See More</Link>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Height</th>
              <th className="py-2 px-4 border-b">Proposer</th>
              <th className="py-2 px-4 border-b">Hash</th>
              <th className="py-2 px-4 border-b">Txs</th>
              <th className="py-2 px-4 border-b">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentBlocks.map(block => 
              <tr key={block.block_id}>
                <td className="py-2 px-4 border-b"><Link className="text-blue-500" href={`/blocks/${block.header.height}`}>{block.header.height}</Link></td>
                <td className="py-2 px-4 border-b"><Link className="text-blue-500" href={`/validators/${block.header.proposer_address}`}>{truncateHash(block.header.proposer_address)}</Link></td>
                <td className="py-2 px-4 border-b">{truncateHash(block.block_id)}</td>
                <td className="py-2 px-4 border-b">{block.tx_hashes.length}</td>
                <td className="py-2 px-4 border-b">{timeAgo(block.header.time)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Latest Transactions table */}
      <div className="col-span-2 lg:col-span-1">
        <div className="flex justify-between items-baseline">
          <h3 className="text-xl font-bold">Latest Transactions</h3>
          <Link className="text-blue-500" href={'/transactions/'}>See More</Link>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Block</th>
              <th className="py-2 px-4 border-b">Hash</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Result</th>
              <th className="py-2 px-4 border-b">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentTxs.map(tx => 
              <tr key={tx.hash_id}>
                <td className="py-2 px-4 border-b"><Link className="text-blue-500" href={`/blocks/${tx.height}`}>{tx.height}</Link></td>
                <td className="py-2 px-4 border-b"><Link className="text-blue-500" href={`/transactions/${tx.hash_id}`}>{truncateHash(tx.hash_id)}</Link></td>
                <td className="py-2 px-4 border-b">{tx.tx_type}</td>
                <td className="py-2 px-4 border-b">{tx.result}</td>
                <td className="py-2 px-4 border-b">{timeAgo(tx.time)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </main>
  );
}
