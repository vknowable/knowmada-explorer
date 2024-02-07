import { getAllProposals } from "@/lib/getProposal"
import { getLastEpoch } from "@/lib/getChainStatus"
import Link from "next/link"

export default async function Governance() {

  const proposalsData: Promise<ProposalsList> = getAllProposals()
  const proposals = await proposalsData

  const epochData: Promise<EpochResponse> = getLastEpoch()
  const epoch = await epochData

  return (
    <div className="grid  place-items-center bg-dots ml-4">
      <div className="flex flex-col gap-10 text-left w-[75%] px-0 py-10">

        {/* Proposals */}
        <div className="px-0">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Proposals</h3>
          <div className="mb-4 text-sm">A total of {proposals.proposals.length} proposals found</div>

          {proposals.proposals.map(proposal => {
          // TODO: Passed/Failed status instead of Finalized
          let status = "n/a"
          let color = ""
          if (epoch.epoch<proposal.voting_start_epoch) {status = "Upcoming"; color = "bg-yellow-500/40 border-yellow-600";}
          if (epoch.epoch>=proposal.voting_start_epoch && epoch.epoch<=proposal.voting_end_epoch) {status = "Voting"; color = "bg-orange-500/40 border-orange-600";}
          if (epoch.epoch>proposal.voting_end_epoch && epoch.epoch<=proposal.grace_epoch) {status = "Finished (Grace)"; color = "bg-blue-500/40 border-blue-600";}
          if (epoch.epoch>proposal.grace_epoch) {status = "Finalized"; color = "border-white/20";}
          
          return (
          <div key={proposal.id} className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 mb-8">

            <div className="flex min-w-full justify-between items-end border-b-2 border-light pb-2 mb-4">
              <div className="text-lg font-bold text-left"><span className="text-sm text-white/60 mr-1">#</span>{proposal.id}</div>
              <div className="grow pl-8"><Link className="text-yellow hover:text-yellow/50 text-lg font-bold text-left" href={`/governance/${proposal.id}`}>{proposal.content.title}</Link></div>
              <div className={`text-sm text-center border ${color} rounded-md p-2 py-1`}>{status}</div>
            </div>

            <div className="flex flex-col mb-4">
              <div className="text-sm tracking-wider text-white/40">Summary:</div>
              <div className="ml-2">{proposal.content.abstract ?? "n/a"}</div>
            </div>

            <div>
              <div className="text-sm tracking-wider text-white/40">Description:</div>
              <div className="ml-2">{proposal.content.details ?? "n/a"}</div>
            </div>

          </div>)})}


        </div>
      </div>
    </div>
  )
}
