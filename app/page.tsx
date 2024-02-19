import { getLastBlock, getBlockAtHeight } from "@/lib/getBlock";
import { truncateHash, timeAgo } from "@/lib/helpers";
import { getChainStatus } from "@/lib/getChainStatus";
import { getTransaction } from "@/lib/getTransaction";

import Link from "next/link";
import LatestBlock from "./components/LatestBlock";
import ActiveVals from "./components/ActiveVals";
import TokenSupply from "./components/TokenSupply";
import LatestBlocks from "./components/LatestBlocks";
import LatestTransactions from "./components/LatestTransactions";

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
  for(let i=0; i<numTxs && i<resolvedTxPromises.length; i++) {
    // const txType: string = resolvedTxPromises[i].txt === null ? "Wrapper" : Object.keys(resolvedTxPromises[i].tx as Object)[0]
    let txType: string = "Unknown"
    if (resolvedTxPromises[i].tx_type === "Wrapper") txType = "Wrapper"
    else {
      txType = resolvedTxPromises[i].tx !== null ? Object.keys(resolvedTxPromises[i].tx as Object)[0] : "Decrypted/Unknown"
    }
    recentTxs[i].tx_type = txType
  }

  return (
    <main className="grid grid-cols-[auto,auto] grid-rows-[auto,auto,auto,auto,auto] gap-8 p-10 min-h-screen place-items-start">


      <ActiveVals />
      <LatestBlock />
      <TokenSupply />
      <LatestBlocks fullView={false} />
      <LatestTransactions fullView={false} />


    </main>
  );
}
