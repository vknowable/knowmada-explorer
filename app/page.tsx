import { getLastBlock, getBlockAtHeight } from "@/lib/getBlock";
import { truncateHash, timeAgo } from "@/lib/helpers";
import { getChainStatus } from "@/lib/getChainStatus";
import { getTransaction } from "@/lib/getTransaction";

import Link from "next/link";
import SupplyChart from "./components/SupplyChart";

export default async function Home() {

  const numBlocks = 10
  const numTxs = 10

  // TODO: similar code is used on more than one page,
  // refactor into single function?
  // get the numBlocks most recent blocks for display
  // fetch the last block first, to have a starting height
  const lastBlockData: Promise<BlockResponse> = getLastBlock()
  const lastBlock = await lastBlockData

  const chainStatusData: Promise<ChainStatus> = getChainStatus()
  const chainStatus = await chainStatusData
  const bonded = parseInt(chainStatus.staking_info.bonded_supply)
  const total = parseInt(chainStatus.staking_info.total_supply)
  const unbonded = total - bonded

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
      if (tx.tx_type === 'Decrypted'){
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
    <main className="grid grid-cols-[auto,auto] grid-rows-[auto,auto,auto,auto,auto] gap-8 p-10 min-h-screen place-items-center bg-dots ml-4">
      <div className="col-span-2 lg:col-span-1 p-10 m-5 min-w-full flex flex-col justify-center items-center bg-dark/90 border border-light/10 rounded-md">
        <div className="self-start text-2xl font-bold text-cyan/80 tracking-wide">Active validators</div>
        <div className="mt-5"><span className="text-lg font-bold text-white">{chainStatus.staking_info.active_validators}</span> out of <span className="text-lg font-bold text-white">{chainStatus.staking_info.total_validators}</span> validators</div>
      </div>
      <div className="col-span-2 lg:col-span-1 p-10 m-5 min-w-full flex flex-col justify-center items-center bg-dark/90 border border-light/10 rounded-md">
        <div className="self-start text-2xl font-bold text-cyan/80 tracking-wide">Latest block</div>
        <div className="mt-5"><span className="text-lg font-bold text-white">{recentBlocks[0].header.height}</span></div>
      </div>
      <div className="col-span-2 pt-10 px-40 mb-5 flex flex-col justify-center items-center bg-dark/90 border border-light/10 rounded-md">
        <h3 className="text-2xl font-bold text-cyan/80 tracking-wide">Token Supply</h3>
        <div className="flex flex-row justify-around items-center gap-20 mt-5">
          <SupplyChart bonded={bonded} total={total}/>
          <div className="flex flex-col items-start">
            <div><span className="font-bold">Native token:</span> {chainStatus.staking_info.native_token}</div>
            <table className="min-w-full border border-light my-5">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-right"></th>
                  <th className="py-2 px-4 border-b text-right">Tokens</th>
                  <th className="py-2 px-4 border-b text-right">%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-cyan/50">Bonded</td>
                  <td className="py-2 px-4 border-b text-cyan/50 text-right">{bonded}</td>
                  <td className="py-2 px-4 border-b text-cyan/50 text-right">{(bonded/total * 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-yellow/50">Unbonded</td>
                  <td className="py-2 px-4 border-b text-yellow/50 text-right">{unbonded}</td>
                  <td className="py-2 px-4 border-b text-yellow/50 text-right">{(unbonded/total * 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Total</td>
                  <td className="py-2 px-4 border-b text-right">{total}</td>
                  <td className="py-2 px-4 border-b text-right">100.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Latest Blocks table */}
      <div className="col-span-2 lg:col-span-1 bg-dark/90 border border-light/10 rounded-md p-8">
        <div className="flex justify-between items-baseline">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4 tracking-wide">Latest Blocks</h3>
          <Link className="text-yellow hover:text-yellow/50" href={'blocks/'}>See More</Link>
        </div>

        <table className="min-w-full bg-black border border-light">
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

      {/* Latest Transactions table */}
      <div className="col-span-2 lg:col-span-1 bg-dark/90 border border-light/10 rounded-md p-8">
        <div className="flex justify-between items-baseline">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4 tracking-wide">Latest Transactions</h3>
          <Link className="text-yellow hover:text-yellow/50" href={'/transactions/'}>See More</Link>
        </div>

        <table className="min-w-full bg-black border border-light">
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
                <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/blocks/${tx.height}`}>{tx.height}</Link></td>
                <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/transactions/${tx.hash_id}`}>{truncateHash(tx.hash_id)}</Link></td>
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
