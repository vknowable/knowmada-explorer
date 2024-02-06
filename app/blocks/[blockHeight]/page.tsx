import { getBlockAtHeight, getTendermintBlockAtHeight } from "@/lib/getBlock";
import { truncateHash, timeAgo, humanizedTime } from "@/lib/helpers";
import { time } from "console";

import Link from "next/link";

type Props = {
  params: {
    blockHeight: string
  }
}

export default async function page({ params: { blockHeight } }: Props) {
  const height = parseInt(blockHeight)

  //TODO: fetch data in parallel instead of awaiting
  const blockData: Promise<BlockResponse> = getBlockAtHeight(height)
  const block = await blockData

  const tendermintBlockData: Promise<TendermintBlockResponse> = getTendermintBlockAtHeight(height)
  const tendermintBlock = await tendermintBlockData

  const blockTxs: TxSummary[] = []
  for (const tx of block.tx_hashes) {
    blockTxs.push({
      height: block.header.height,
      time: block.header.time,
      result: "Ok", // TODO: how to find this correctly
      hash_id: tx.hash_id,
      tx_type: tx.tx_type,
    })
  }

  const formattedDate = humanizedTime(block.header.time)

  return (
    <div className="grid min-h-screen place-items-center bg-dots ml-4">
      <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

        {/* Overview */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Block Details</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8">
            <div className="flex justify-between border-b-[1px] border-b-white/10">
              <div className="font-bold text-md">Height:</div>
              <div>{block.header.height}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Hash:</div>
              <div>{block.block_id}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Proposer:</div>
              <div>{block.header.proposer_address}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Time:</div>
              <div>{formattedDate}</div>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Signatures</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8">
            {tendermintBlock.result.block.last_commit.signatures.map(signature =>
              <div key={signature.validator_address} className="border-b-[1px] border-b-white/10 mt-4">{signature.validator_address}</div>)}
          </div>
        </div>

        {/* Transactions */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Transactions</h3>
          <div className="grid min-h-screen place-items-center bg-dark/90 border border-light/10 rounded-md p-8">
            {/* Latest Transactions table */}


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
                {blockTxs.map(tx =>
                  <tr key={tx.hash_id}>
                    <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/blocks/${tx.height}`}>{tx.height}</Link></td>
                    <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/transactions/${tx.hash_id}`}>{truncateHash(tx.hash_id, 12, 12)}</Link></td>
                    <td className="py-2 px-4 border-b text-cyan/60">{tx.tx_type}</td>
                    <td className="py-2 px-4 border-b">{tx.result}</td>
                    <td className="py-2 px-4 border-b">{timeAgo(tx.time)}</td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  )
}