import ProposalInfo from "@/app/components/ProposalInfo"
// import { getProposal, getProposalResult } from "@/lib/getProposal"
// import { getLastEpoch } from "@/lib/getChainStatus"

type Props = {
  params: {
    proposalId: string
  }
}

export default function page({ params: { proposalId } }: Props) {

  return (
    <div className="">
      <ProposalInfo proposalId={proposalId} />
    </div>
  )
}