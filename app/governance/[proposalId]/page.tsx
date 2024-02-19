import { getProposal, getProposalResult } from "@/lib/getProposal"
import { getLastEpoch } from "@/lib/getChainStatus"
import Link from "next/link"
import TallyChart from "@/app/components/TallyChart"

type Props = {
  params: {
    proposalId: string
  }
}

export default async function page({ params: { proposalId } }: Props) {

  const proposalData: Promise<ProposalInfo> = getProposal(parseInt(proposalId))
  const proposal = await proposalData

  const proposalResultData: Promise<ProposalResult> = getProposalResult(parseInt(proposalId))
  const proposalResult = await proposalResultData

  const epochData: Promise<EpochResponse> = getLastEpoch()
  const epoch = await epochData

  const yay = parseInt(proposalResult.total_yay_power)
  const nay = parseInt(proposalResult.total_nay_power)
  const abstain = parseInt(proposalResult.total_abstain_power)
  const total = parseInt(proposalResult.total_voting_power)
  const no_vote = total - (yay+nay+abstain)

  // result "passed/rejected" only applies if voting is done, otherwise it will always say "rejected" by default
  let status = "n/a"
  let color = ""
  if (epoch.epoch < proposal.voting_start_epoch) { status = "Upcoming"; color = "bg-yellow-500/40 border-yellow-600"; }
  if (epoch.epoch >= proposal.voting_start_epoch && epoch.epoch <= proposal.voting_end_epoch) { status = "Voting"; color = "bg-orange-500/40 border-orange-600"; }
  if (epoch.epoch > proposal.voting_end_epoch && epoch.epoch <= proposal.grace_epoch) {
    if (proposalResult.result === 'passed') { status = "Passed (Grace period)"; color = "bg-green-500/40 border-green-600"; }
    else { status = "Rejected"; color = "bg-red-500/40 border-red-600"; }
  }
  if (epoch.epoch > proposal.grace_epoch) {
    if (proposalResult.result === 'passed') { status = "Passed"; color = "bg-green-500/40 border-green-600"; }
    else { status = "Rejected"; color = "bg-red-500/40 border-red-600"; }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-dots ml-4">
      <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

        <div key={proposal.id} className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 mb-8">

          <div className="flex min-w-full justify-between items-end border-b-2 border-light pb-2 mb-4">
            <div className="text-lg font-bold text-left"><span className="text-sm text-white/60 mr-1">#</span>{proposal.id}</div>
            <div className="grow pl-8"><Link className="text-yellow hover:text-yellow/50 text-lg font-bold text-left" href={`/governance/${proposal.id}`}>{proposal.content.title}</Link></div>
            <div className="mx-4 text-white/50">{Object.keys(proposal.type)[0]}</div>
            <div className={`text-sm text-center border ${color} rounded-md p-2 py-1`}>{status}</div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-white/40">Summary:</div>
            <div className="ml-2">{proposal.content.abstract ?? "n/a"}</div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-white/40">Description:</div>
            <div className="ml-2">{proposal.content.details ?? "n/a"}</div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-white/40">Start Epoch:</div>
            <div className="ml-2">{proposal.voting_start_epoch ?? "n/a"}</div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-white/40">End Epoch:</div>
            <div className="ml-2">{proposal.voting_end_epoch ?? "n/a"}</div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-white/40">Grace Epoch:</div>
            <div className="ml-2">{proposal.grace_epoch ?? "n/a"}</div>
          </div>

          <div className="flex min-w-full justify-between items-end border-t-2 border-light/30 py-2 mb-4 text-lg">Tally:</div>
            <div className="flex justify-around items-center">
              <TallyChart yay={yay} nay={nay} abstain={abstain} total={total} />
              <div className="flex flex-col">
                <div className="flex justify-between min-w-full text-lg border-b border-light/30 mb-2"><span>Quroum:</span>{proposalResult.tally_type}</div>
                <div className="flex justify-between min-w-full"><span className="text-green-500/60 mr-4">Yay:</span>{yay} ( {(yay/total * 100).toFixed(4)}% )</div>
                <div className="flex justify-between min-w-full"><span className="text-red-500/60 mr-4">Nay:</span>{nay} ( {(nay/total * 100).toFixed(4)}% )</div>
                <div className="flex justify-between min-w-full"><span className="text-[#0DD]/60 mr-4">Abstain:</span>{abstain} ( {(abstain/total * 100).toFixed(4)}% )</div>
                <div className="flex justify-between min-w-full"><span className="text-white/60 mr-4">No Vote:</span>{no_vote} ( {(no_vote/total * 100).toFixed(4)}% )</div>
              </div>
            </div>

          <div className="flex min-w-full justify-between items-end border-t-2 border-light/30 py-2 mb-4 text-lg">Content:</div>
          <pre className="mb-8">{JSON.stringify(proposal.type, null, 2)}</pre>
          <div className="flex min-w-full justify-between items-end border-t-2 border-light/30 py-2 mb-4 text-lg">Votes:</div>
          <div>tnam.... | yay/nay</div>


        </div>

      </div>
    </div>
  )
}