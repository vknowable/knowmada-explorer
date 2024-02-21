import { getProposal, getProposalResult } from "@/lib/getProposal"
import { getLastEpoch } from "@/lib/getChainStatus"
import TallyChart from "@/app/components/TallyChart"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Props = {
  params: {
    proposalId: string
  }
}

export default async function page({ params: { proposalId } }: Props) {

  // const proposalData: Promise<ProposalInfo> = getProposal(parseInt(proposalId))
  // const proposal = await proposalData

  // const proposalResultData: Promise<ProposalResult> = getProposalResult(parseInt(proposalId))
  // const proposalResult = await proposalResultData

  // const epochData: Promise<EpochResponse> = getLastEpoch()
  // const epoch = await epochData

  const [proposal, proposalResult, epoch] = await Promise.all([
    getProposal(parseInt(proposalId)),
    getProposalResult(parseInt(proposalId)),
    getLastEpoch()
  ])

  const yay = parseInt(proposalResult.total_yay_power)
  const nay = parseInt(proposalResult.total_nay_power)
  const abstain = parseInt(proposalResult.total_abstain_power)
  const total = parseInt(proposalResult.total_voting_power)
  const no_vote = total - (yay + nay + abstain)

  // result "passed/rejected" only applies if voting is done, otherwise it will always say "rejected" by default
  let status = "n/a"
  let color = ""
  if (epoch.epoch < proposal.voting_start_epoch) { status = "Upcoming"; color = "bg-[#cccc00] hover:bg-[#9e9e00] text-zinc-900"; }
  if (epoch.epoch >= proposal.voting_start_epoch && epoch.epoch <= proposal.voting_end_epoch) { status = "Voting"; color = "bg-[#00baba] hover:bg-[#02544c] text-zinc-900 animate-pulse"; }
  if (epoch.epoch > proposal.voting_end_epoch && epoch.epoch <= proposal.grace_epoch) {
    if (proposalResult.result === 'passed') { status = "Passed (Grace period)"; color = "bg-[#00e800] hover:bg-[#00b500] text-zinc-900"; }
    else { status = "Rejected"; color = "bg-[#d10000] hover:bg-[#a10000] text-zinc-200"; }
  }
  if (epoch.epoch > proposal.grace_epoch) {
    if (proposalResult.result === 'passed') { status = "Passed"; color = "bg-[#00e800] hover:bg-[#00b500] text-zinc-900"; }
    else { status = "Rejected"; color = "bg-[#d10000] hover:bg-[#a10000] text-zinc-200"; }
  }

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8">
        <CardHeader className="flex flex-row justify-between items-baseline gap-4">
          <div className="text-lg"><span className="text-sm text-white/60 mr-1">#</span>{proposal.id}</div>
          <CardTitle>{proposal.content.title}</CardTitle>
          <div className="flex flex-row gap-4 items-baseline">
            <CardDescription>{Object.keys(proposal.type)[0]}</CardDescription>
            <Badge className={`p-2 px-4 text-white ${color}`} style={{ whiteSpace: 'nowrap' }}>{status}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Separator />

          <div className="flex flex-col my-4">
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

          <Separator />
          <div className="flex min-w-full justify-between items-end py-2 mb-4 text-lg mt-2">Tally:</div>
          <div className="flex justify-around items-center gap-24">
            <TallyChart yay={yay} nay={nay} abstain={abstain} total={total} />
            <Table>
              <TableCaption><span className="mr-4">Required quroum:</span>{proposalResult.tally_type}</TableCaption>
              <TableBody>
                <TableRow>
                  <TableCell className="text-[#86e386]">Yay:</TableCell>
                  <TableCell>{yay}</TableCell>
                  <TableCell>{(yay / total * 100).toFixed(4)} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-[#e04848]">Nay:</TableCell>
                  <TableCell>{nay}</TableCell>
                  <TableCell>{(nay / total * 100).toFixed(4)} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-[#4277f5]">Abstain:</TableCell>
                  <TableCell>{abstain}</TableCell>
                  <TableCell>{(abstain / total * 100).toFixed(4)} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-zinc-500">No Vote:</TableCell>
                  <TableCell>{no_vote}</TableCell>
                  <TableCell>{(no_vote / total * 100).toFixed(4)} %</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Content:</CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="pt-8">
            <CardContent>
              <pre>{JSON.stringify(proposal.type, null, 2)}</pre>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Votes:</CardTitle>
          <CardDescription>Not supported yet</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}