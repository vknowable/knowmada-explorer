'use client'

// import { getAllProposals } from "@/lib/getProposal"
// import { getLastEpoch } from "@/lib/getChainStatus"
import { useAtom } from "jotai"
// import { chainStatusAtom, allProposalsAtom } from "../store/store"
import { currentEpochAtom, allProposalsAtom } from "../store/store"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function Governance() {

  // const proposalsData: Promise<ProposalsList> = getAllProposals()
  // const proposals = await proposalsData

  // const epochData: Promise<EpochResponse> = getLastEpoch()
  // const epoch = await epochData

  // const [{ data: chainStatusData, isPending: statusPending, isError }] = useAtom(chainStatusAtom)
  const [{ data: epochData, isPending: epochPending, isError: epochIsError }] = useAtom(currentEpochAtom)
  const [{ data: proposalsData, isPending: proposalsPending, isError: proposalsError }] = useAtom(allProposalsAtom)

  if (epochPending || proposalsPending) {
    return (
      <div className="grid place-items-center mb-12">
        <Card className="w-[80%] mt-8 bg-transparent border-none">
          <CardHeader>
            <CardTitle>Proposals:</CardTitle>
          </CardHeader>
          <CardContent className="grid place-items-center">
            <Separator />
            <div>Checking...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const proposals: ProposalInfo[] = proposalsData
  const epoch = epochData.epoch

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8 bg-transparent border-none">
        <CardHeader>
          <CardTitle>Proposals:</CardTitle>
          <CardDescription>A total of {proposals.length} proposals found</CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center">
          <Separator />

          {proposals.reverse().map((proposal: ProposalInfo) => {
            // TODO: Passed/Failed status instead of Finalized
            let status = "n/a"
            let color = ""
            if (epoch < proposal.startEpoch) { status = "Upcoming"; color = "bg-[#cccc00] hover:bg-[#9e9e00] text-zinc-900"; }
            if (epoch >= proposal.startEpoch && epoch <= proposal.endEpoch) { status = "Voting"; color = "bg-[#00baba] hover:bg-[#02544c] text-zinc-900 animate-pulse"; }
            if (epoch > proposal.endEpoch && epoch <= proposal.activationEpoch) { status = "Finished (Grace)"; color = "bg-zinc-700/50 hover:bg-zinc-800/50"; }
            if (epoch > proposal.activationEpoch) { status = "Finalized"; color = "bg-zinc-700/50 hover:bg-zinc-800/50"; }
            let content: ProposalContent = {}
            try {
              content = JSON.parse(proposal.content)
            } catch (error) {
              console.error("Could not parse content field for proposal ", proposal.id)
            }

            return (
              <Card className="w-[90%] mt-8" key={proposal.id}>
                <CardHeader className="flex flex-row justify-between items-baseline gap-4">
                  <div className="text-lg"><span className="text-sm text-zinc-300 mr-1">#</span>{proposal.id}</div>
                  <CardTitle><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/governance/${proposal.id}`}>{content.title ?? "(untitled)"}</Link></CardTitle>
                  <div className="flex flex-row gap-4 items-baseline">
                    <CardDescription>{proposal.type}</CardDescription>
                    <Badge className={`p-2 px-4 text-white ${color}`} style={{ whiteSpace: 'nowrap' }}>{status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator />
                  <div className="flex flex-col my-4">
                    <div className="text-sm tracking-wider text-zinc-500">Abstract:</div>
                    <div className="ml-2">{content.abstract ?? "n/a"}</div>
                  </div>

                  <div>
                    <div className="text-sm tracking-wider text-zinc-500">Details:</div>
                    <div className="ml-2">{content.details ?? "n/a"}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

        </CardContent>
      </Card>
    </div>
  )
}
