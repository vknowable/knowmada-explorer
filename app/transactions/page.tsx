import { getLastBlock, getBlockAtHeight } from "@/lib/getBlock";
import { getTransaction } from "@/lib/getTransaction";
import { truncateHash, timeAgo } from "@/lib/helpers";

import Link from "next/link";

export default async function Transactions() {
  const numBlocks = 20
  const numTxs = 50

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
  const txPromises: Promise<TxResponse>[] = []
  for (const block of recentBlocks) {
    for (const tx of block.tx_hashes) {
      if (tx.tx_type === 'Decrypted') {
        const txQuery: Promise<TxResponse> = getTransaction(tx.hash_id)
        txPromises.push(txQuery)
        recentTxs.push({
          height: block.header.height,
          time: block.header.time,
          hash_id: tx.hash_id,
          tx_type: tx.tx_type,
          result: "Ok" // TODO: not sure how to properly check for this?
        })
      }
      if (recentTxs.length >= numTxs) break
    }
    if (recentTxs.length >= numTxs) break
  }
  
  const resolvedTxPromises = await Promise.all(txPromises)
  for(let i=0; i<numTxs; i++) {
    const txType: string = resolvedTxPromises[i].tx === null ? "Wrapper" : Object.keys(resolvedTxPromises[i].tx as Object)[0]
    recentTxs[i].tx_type = txType
  }

  return (
    <div className="grid min-h-screen place-items-center p-10 bg-dots ml-4">
      {/* Latest Transactions table */}
      <div className="col-span-2 lg:col-span-1 w-full bg-dark/90 border border-light/10 rounded-md p-8">
        <div className="flex justify-between items-baseline">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Latest Transactions</h3>
          {/* <Link className="text-yellow hover:text-yellow/50" href={'/transactions/'}>See More</Link> */}
        </div>

        <table className="min-w-full bg-black border border-light">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Block</th>
              <th className="py-2 px-4 border-b text-left">Hash</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Result</th>
              <th className="py-2 px-4 border-b text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentTxs.map(tx => 
              <tr key={tx.hash_id}>
                <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/blocks/${tx.height}`}>{tx.height}</Link></td>
                <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/transactions/${tx.hash_id}`}>{truncateHash(tx.hash_id, 12, 12)}</Link></td>
                <td className="py-2 px-4 border-b">{tx.tx_type}</td>
                <td className="py-2 px-4 border-b">{tx.result}</td>
                <td className="py-2 px-4 border-b">{timeAgo(tx.time)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
