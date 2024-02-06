import { truncateHash } from "@/lib/helpers"
import { getValidatorInfo, getValidatorUptime, getConsensusVals } from "@/lib/getValidator"
import { getChainStatus } from "@/lib/getChainStatus"
import Link from "next/link"
import Image from "next/image"

export default async function Validators() {

  const consensusValsData: Promise<ConsensusSetResponse> = getConsensusVals()
  const consensusVals = await consensusValsData

  const chainStatusData: Promise<ChainStatus> = getChainStatus()
  const chainStatus = await chainStatusData
  const bonded = parseInt(chainStatus.staking_info.bonded_supply)

  // sort by stake
  consensusVals.consensus_set.sort((a, b) => {
    // Convert to numbers for comparison, treating null as -Infinity
    const stakeA = a.stake ? parseFloat(a.stake) : -Infinity;
    const stakeB = b.stake ? parseFloat(b.stake) : -Infinity;
  
    // Sort in descending order
    return stakeB - stakeA;
  });

  // TODO: include a tab for inactive validators
  return (
    <div className="grid min-h-screen place-items-center p-10 bg-dots ml-4">
    {/*Active Validators table */}
    <div className="col-span-2 lg:col-span-1 w-full bg-dark/90 border border-light/10 rounded-md p-8">
      <div className="flex justify-between items-baseline">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Active Validators</h3>
      </div>

      <table className="min-w-full bg-black border border-light">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Rank</th>
            <th className="py-2 px-4 border-b text-left">Validator</th>
            <th className="py-2 px-4 border-b  text-right">Stake</th>
            <th className="py-2 px-4 border-b  text-right">Vote Power</th>
            <th className="py-2 px-4 border-b  text-right">Commission</th>
            <th className="py-2 px-4 border-b  text-right">Uptime</th>
            <th className="py-2 px-4 border-b  text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {consensusVals.consensus_set.map((val, i) => 
            <tr key={val.tm_address}>
              <td className="py-2 px-4 border-b">{i+1}</td>
              <td className="py-2 px-4 border-b">
                <Image alt="" src={val.metadata?.avatar ?? `/assets/Nam_0${Math.floor(Math.random()*7)+1}.svg`} width="10" height="10" className="min-h-8 min-w-8 border-2 border-light/20 inline mr-4 rounded-full"></Image>
                <Link className="text-yellow hover:text-yellow/50 " href={`/validators/${val.nam_address}`}>{truncateHash(val.nam_address, 12, 12)}</Link></td>
              <td className="py-2 px-4 border-b text-right">{val.stake}</td>
              <td className="py-2 px-4 border-b text-right text-cyan/60">{
                val.stake ? ((parseInt(val.stake)/bonded)*100).toFixed(4)
                : parseInt("0")
              } %</td>
              <td className="py-2 px-4 border-b text-right">
                {val.commission?.commission_rate ? ((parseFloat(val.commission.commission_rate) * 100).toFixed(2)) : "n/a"} %
              </td>
              <td className="py-2 px-4 border-b text-right">{(val.uptime.uptime * 100).toFixed(2)} %</td>
              <td className="py-2 px-4 border-b text-right">{val.state}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}
