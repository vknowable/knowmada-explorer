import { getValidatorInfo } from "@/lib/getValidator"
import { getChainStatus } from "@/lib/getChainStatus"
import Link from "next/link"
import Image from "next/image"

type Props = {
  params: {
    valAddr: string
  }
}

export default async function page({ params: { valAddr } }: Props) {

  const valInfoData: Promise<ValidatorInfo> = getValidatorInfo(valAddr)
  const valInfo = await valInfoData

  const chainStatusData: Promise<ChainStatus> = getChainStatus()
  const chainStatus = await chainStatusData
  const bonded = parseInt(chainStatus.staking_info.bonded_supply)

  const uptime = valInfo.uptime.uptime ? (valInfo.uptime.uptime * 100).toFixed(2) : "n/a"
  const commission = valInfo.commission?.commission_rate ? ((parseFloat(valInfo.commission.commission_rate) * 100).toFixed(2)) : "n/a"
  const votingPower = valInfo.stake? (parseInt(valInfo.stake)/bonded * 100).toFixed(4) : "n/a"

  const avatarUrl = valInfo.metadata?.avatar ?? `/assets/Nam_0${Math.floor(Math.random()*7)+1}.svg`

  const bonds: BondList[] = []
  const unbonds: BondList[] = []

  return (
    <div className="grid min-h-screen place-items-center bg-dots ml-4">
    <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

      {/* Overview */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Validator Details</h3>
        <div className="mb-4 text-sm">(View the account page for <Link className="text-yellow hover:text-yellow/50" href={`/accounts/${valInfo.nam_address}`}>{valInfo.nam_address}</Link> instead)</div>
        <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8">

          {/* Summary card */}
          <div className="flex justify-around items-end mb-4">
            <Image alt="" src={avatarUrl} width="100" height="100" className="bg-dark/90 min-h-48 min-w-48 inline mr-4 border-4 border-light/20 rounded-full"></Image>
            <div>
              <div className="flex flex-col">
                <div className="font-bold text-md">Address:</div>
                <div className="ml-2 text-cyan/60">{valInfo.nam_address}</div>
              </div>
              <div className="flex flex-col mt-4">
                <div className="font-bold text-md">Tendermint Address:</div>
                <div className="ml-2 text-cyan/60">{valInfo.tm_address}</div>
              </div>
              <div className="flex flex-col mt-4">
                <div className="font-bold text-md">Voting Power:</div>
                <div className="ml-2 text-cyan/60">{valInfo.stake}<span className="ml-4">({votingPower} %)</span></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between my-4 pb-4 border-b-4 border-white/20">
            <div className="text-sm tracking-wider text-white/40">Description:</div>
            <div className="ml-2">{valInfo.metadata?.description ?? ""}</div>
          </div>

          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
            <div className="font-bold text-md">Website:</div>
            <div>{valInfo.metadata?.website ?? ""}</div>
          </div>
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
            <div className="font-bold text-md">Discord:</div>
            <div>{valInfo.metadata?.discord_handle ?? ""}</div>
          </div>
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
            <div className="font-bold text-md">Email:</div>
            <div>{valInfo.metadata?.email ?? ""}</div>
          </div>
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
            <div className="font-bold text-md">Commission:</div>
            <div>{commission} %</div>
          </div>
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
            <div className="font-bold text-md">Status:</div>
            <div>{valInfo.state}</div>
          </div>
        </div>
      </div>

      {/* Condition */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Condition</h3>
        <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8">
          <div className="flex justify-between border-b-[1px] border-b-white/10">
            <div className="font-bold text-md">Uptime:</div>
            <div>{uptime}</div>
          </div>
        </div>
      </div>

      {/* Delegations */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Delegations</h3>
        <div className="grid min-h-screen place-items-center bg-dark/90 border border-light/10 rounded-md p-8">

          {/* Bonds table */}
          <table className="min-w-full bg-black border border-light">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Address</th>
                <th className="py-2 px-4 border-b text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bonds.map((bond, i) =>
                <tr key={i}>
                  <td className="py-2 px-4 border-b">Bond</td>
                  <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/accounts/${bond.address}`}>{bond.address}</Link></td>
                  <td className="py-2 px-4 border-b">{bond.amount}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Unbonds table */}
          <table className="min-w-full bg-black border border-light">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Address</th>
                <th className="py-2 px-4 border-b text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {unbonds.map((unbond, i) =>
                <tr key={i}>
                  <td className="py-2 px-4 border-b">Unbond</td>
                  <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/accounts/${unbond.address}`}>{unbond.address}</Link></td>
                  <td className="py-2 px-4 border-b">{unbond.amount}</td>
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