import { getBlockByHash } from "@/lib/getBlock"
import { getTransaction } from "@/lib/getTransaction"
import { humanizedTime } from "@/lib/helpers"

import Link from "next/link"

type Props = {
  params: {
    txHash: string
  }
}

export default async function page({ params: { txHash: hash } }: Props) {
  const txData: Promise<TxResponse> = getTransaction(hash)
  const tx = await txData

  const blockData: Promise<BlockResponse> = getBlockByHash(tx.block_id)
  const block = await blockData
  const formattedDate = humanizedTime(block.header.time)

  // get a more descriptive name than 'Decrypted', ie: Transfer, Bond, etc.
  const txType: string = tx.tx === null ? "Wrapper" : Object.keys(tx.tx)[0]

  // the contents of the tx, if not a wrapper type
  // TODO: tx types with nested fields, eg Ibc, UpdateStewardCommission? will break this
  // TODO: Ibc messages contain what looks like a protobuf message, would need to be deserialized to get any info
  let txContent = <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">n/a</div>
  if (tx.tx !== null) {
    const txObject = Object.values(tx.tx)[0]
    const txDestructured = Object.entries(txObject)
    txContent =
    <>
      {txDestructured.map( ([key, value]) => (
        <div key={key} className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
          <div className="font-bold text-md">{(key as string)[0].toUpperCase()+(key as string).substring(1)}:</div>
          <div>{value as string}</div>
        </div>
      ))}
    </>
  }

  return (
    <div className="grid min-h-screen place-items-center bg-dots ml-4">
      <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

        {/* Overview */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Transaction Details:</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8">
            <div className="flex justify-between border-b-[1px] border-b-white/10">
              <div className="font-bold text-md">Hash</div>
              <div>{tx.hash}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Height:</div>
              <div><Link className="text-yellow hover:text-yellow/50" href={`/blocks/${block.header.height}`}>{block.header.height}</Link></div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Time:</div>
              <div>{formattedDate}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Type:</div>
              <div>{txType}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Result:</div>
              <div>Ok</div> {/*TODO: how to find this correctly*/}
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Memo:</div>
              <div>(Not supported yet)</div>
            </div>
          </div>
        </div>

        {/* Contents */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Contents:</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">
            {txContent}
          </div>
        </div>
      </div>
    </div>
  )
}