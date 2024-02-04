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

  // const date = new Date(block.header.time)
  // const formattedDate = date.toLocaleString('en-US', {
  //   year: 'numeric',
  //   month: 'short',
  //   day: '2-digit',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   timeZone: 'UTC',
  // })
  const formattedDate = humanizedTime(block.header.time)



  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col gap-10 text-left w-[75%] px-20 py-10">

        {/* Overview */}
        <div className="bg-slate-700 p-4">
          <h3 className="text-xl font-bold border-b-[1px] border-b-white/50 mt-5">Block Details</h3>
          <div className="flex flex-col">
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Height:</div>
              <div>{block.header.height}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Hash:</div>
              <div>{block.block_id}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Proposer:</div>
              <div>{block.header.proposer_address}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Time:</div>
              <div>{formattedDate}</div>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="bg-slate-700 p-4">
          <h3 className="text-xl font-bold border-b-[1px] border-b-white/50 mt-5">Signatures</h3>
          <div className="flex flex-col">
            {tendermintBlock.result.block.last_commit.signatures.map(signature =>
              <div key={signature.validator_address} className="mt-2 border-b-[1px] border-b-white/20">{signature.validator_address}</div>)}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-slate-700 p-4">
          <h3 className="text-xl font-bold border-b-[1px] border-b-white/50 mt-5">Transactions</h3>
          <div className="grid min-h-screen place-items-center">
            {/* Latest Transactions table */}


            <table className="min-w-full bg-white border border-gray-300 mt-5">
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
                    <td className="py-2 px-4 border-b"><Link className="text-blue-500" href={`/blocks/${tx.height}`}>{tx.height}</Link></td>
                    <td className="py-2 px-4 border-b"><Link className="text-blue-500" href={`/transactions/${tx.hash_id}`}>{truncateHash(tx.hash_id, 12, 12)}</Link></td>
                    <td className="py-2 px-4 border-b">{tx.tx_type}</td>
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