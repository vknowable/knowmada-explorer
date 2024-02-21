'use client'

import { useAtom } from "jotai"
import { chainStatusAtom } from "../store/store"
import { Badge } from "@/components/ui/badge"

export default function ChainId() {
  const [{ data, isPending, isError }] = useAtom(chainStatusAtom)

  return (
    <div className="flex flex-col items-start min-w-56">
      <div className="text-sm font-normal text-white">Chain-Id:</div>
      {/* <div className="text-sm text-yellow" style={{ whiteSpace: 'nowrap' }}>{data?.chain_id ?? ""}</div> */}
      {isPending ? <Badge className="bg-black border-2 border-white/50 hover:bg-white/10 text-[#FF0]/80 py-1" style={{ whiteSpace: 'nowrap' }}>Checking...</Badge>
      : <Badge className="bg-black border-2 border-white/50 hover:bg-white/10 text-[#FF0]/80 py-1 px-4 mt-1" style={{ whiteSpace: 'nowrap' }}>{data.chain_id}</Badge>
      }
      <div className="text-sm font-normal text-white mt-2">Current Epoch:</div>
      {/* <div className="text-sm font-light text-white mt-2 flex items-baseline">Current Epoch:<span className="text-sm font-light text-yellow ml-2">{data?.epoch ?? ""}</span></div> */}
      {isPending ? <Badge className="bg-black border-2 border-white/50 hover:bg-white/10 text-[#FF0]/80 py-1" style={{ whiteSpace: 'nowrap' }}>Checking...</Badge>
      : <Badge className="bg-black border-2 border-white/50 hover:bg-white/10 text-[#FF0]/80 py-1 px-4 mt-1" style={{ whiteSpace: 'nowrap' }}>{data.epoch}</Badge>
      }
    </div>
  )
}
