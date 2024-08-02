'use client'

import { useAtom } from "jotai"
// import { chainStatusAtom } from "../store/store"
import { chainParamsAtom, currentEpochAtom } from "../store/store"
import { Badge } from "@/components/ui/badge"

export default function ChainId() {
  // const [{ data, isPending, isError }] = useAtom(chainStatusAtom)
  const [{ data: paramsData, isPending: isPendingParams, isError: isErrorParams }] = useAtom(chainParamsAtom)
  const [{ data: epochData, isPending: isPendingEpoch, isError: isErrorEpoch }] = useAtom(currentEpochAtom)


  return (
    <div className="flex flex-col items-start min-w-56">
      <div className="text-sm font-normal text-zinc-300">Chain-Id:</div>
      {/* <div className="text-sm text-yellow" style={{ whiteSpace: 'nowrap' }}>{data?.chain_id ?? ""}</div> */}
      {isPendingParams ? <Badge className="bg-black border-2 border-white/50 hover:bg-white/10 text-[#FF0]/80 py-1" style={{ whiteSpace: 'nowrap' }}>Checking...</Badge>
      : <Badge className="bg-black border-2 border-white/50 hover:bg-white/10 text-[#FF0]/80 py-1 px-4 mt-1" style={{ whiteSpace: 'nowrap' }}>{paramsData.chainId}</Badge>
      }
      <div className="text-sm font-normal text-zinc-300 mt-2">Current Epoch:</div>
      {/* <div className="text-sm font-light text-white mt-2 flex items-baseline">Current Epoch:<span className="text-sm font-light text-yellow ml-2">{data?.epoch ?? ""}</span></div> */}
      {isPendingEpoch ? <Badge className="bg-black border-2 border-white/50 hover:bg-white/10 text-[#FF0]/80 py-1" style={{ whiteSpace: 'nowrap' }}>Checking...</Badge>
      : <Badge className="bg-black border-2 border-white/50 hover:bg-white/10 text-[#FF0]/80 py-1 px-4 mt-1" style={{ whiteSpace: 'nowrap' }}>{epochData.epoch}</Badge>
      }
    </div>
  )
}
