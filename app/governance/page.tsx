import { getAllProposals } from "@/lib/getProposal"
import { getLastEpoch } from "@/lib/getChainStatus"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default async function Governance() {

  const proposalsData: Promise<ProposalsList> = getAllProposals()
  const proposals = await proposalsData

  const epochData: Promise<EpochResponse> = getLastEpoch()
  const epoch = await epochData

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8 bg-transparent border-none">
        <CardHeader>
          <CardTitle>Proposals:</CardTitle>
          <CardDescription>A total of {proposals.proposals.length} proposals found</CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center">
          <Separator />

      {proposals.proposals.reverse().map(proposal => {
        // TODO: Passed/Failed status instead of Finalized
        let status = "n/a"
        let color = ""
        if (epoch.epoch < proposal.voting_start_epoch) { status = "Upcoming"; color = "bg-[#cccc00] hover:bg-[#9e9e00] text-zinc-900"; }
        if (epoch.epoch >= proposal.voting_start_epoch && epoch.epoch <= proposal.voting_end_epoch) { status = "Voting"; color = "bg-[#00baba] hover:bg-[#02544c] text-zinc-900 animate-pulse"; }
        if (epoch.epoch > proposal.voting_end_epoch && epoch.epoch <= proposal.grace_epoch) { status = "Finished (Grace)"; color = "bg-zinc-700/50 hover:bg-zinc-800/50"; }
        if (epoch.epoch > proposal.grace_epoch) { status = "Finalized"; color = "bg-zinc-700/50 hover:bg-zinc-800/50"; }

        return (
          <Card className="w-[90%] mt-8" key={proposal.id}>
            <CardHeader className="flex flex-row justify-between items-baseline gap-4">
              <div className="text-lg"><span className="text-sm text-zinc-300 mr-1">#</span>{proposal.id}</div>
              <CardTitle><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/governance/${proposal.id}`}>{proposal.content.title}</Link></CardTitle>
              <div className="flex flex-row gap-4 items-baseline">
                <CardDescription>{Object.keys(proposal.type)[0]}</CardDescription>
                <Badge className={`p-2 px-4 text-white ${color}`} style={{ whiteSpace: 'nowrap' }}>{status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Separator />
              <div className="flex flex-col my-4">
                <div className="text-sm tracking-wider text-zinc-500">Summary:</div>
                <div className="ml-2">{proposal.content.abstract ?? "n/a"}</div>
              </div>

              <div>
                <div className="text-sm tracking-wider text-zinc-500">Description:</div>
                <div className="ml-2">{proposal.content.details ?? "n/a"}</div>
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
