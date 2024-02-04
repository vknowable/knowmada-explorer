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
  let txContent = <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">n/a</div>
  if (tx.tx !== null) {
    const txObject = Object.values(tx.tx)[0]
    const txDestructured = Object.entries(txObject)
    txContent =
    <>
      {txDestructured.map( ([key, value]) => (
        <div key={key} className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
          <div>{key as string}</div>
          <div>{value as string}</div>
        </div>
      ))}
    </>
  }

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col gap-10 text-left w-[75%] px-20 py-10">

        {/* Overview */}
        <div className="bg-slate-700 p-4">
          <h3 className="text-xl font-bold border-b-[1px] border-b-white/50 mt-5">Transaction Details:</h3>
          <div className="flex flex-col">
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Hash</div>
              <div>{tx.hash}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Height:</div>
              <div><Link className="text-blue-500" href={`/blocks/${block.header.height}`}>{block.header.height}</Link></div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Time:</div>
              <div>{formattedDate}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Type:</div>
              <div>{txType}</div>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Result:</div>
              <div>Ok</div> {/*TODO: how to find this correctly*/}
            </div>
            <div className="flex justify-between border-b-[1px] border-b-white/20 mt-5">
              <div>Memo:</div>
              <div>(Not supported yet)</div>
            </div>
          </div>
        </div>

        {/* Contents */}
        <div className="bg-slate-700 p-4">
          <h3 className="text-xl font-bold border-b-[1px] border-b-white/50 mt-5">Contents:</h3>
          <div className="flex flex-col">
            {txContent}
          </div>
        </div>
      </div>
    </div>
  )
}