'use client'

// import { getProposal, getProposalResult } from "@/lib/getProposal"
// import { getLastEpoch } from "@/lib/getChainStatus"
import { useAtom } from "jotai"
import { currentEpochAtom, proposalInfoAtom, proposalIdAtom, totalVPAtom } from "@/app/store/store"
import TallyChart from "@/app/components/TallyChart"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Props = {
  proposalId: string
}

export default function ProposalInfo({ proposalId }: Props) {

  // const [proposal, proposalResult, epoch] = await Promise.all([
  //   getProposal(parseInt(proposalId)),
  //   getProposalResult(parseInt(proposalId)),
  //   getLastEpoch()
  // ])
  const [Id, setId] = useAtom(proposalIdAtom)
  setId(parseInt(proposalId))
  // const [{ data: chainStatusData, isPending: statusPending, isError }] = useAtom(chainStatusAtom)
  // const [{ data: infoData, isPending: infoPending, isError: infoError }] = useAtom(proposalInfoAtom)
  // const [{ data: resultData, isPending: resultPending, isError: resultError }] = useAtom(proposalResultAtom)
  const [{ data: epochData, isPending: epochPending, isError: epochError }] = useAtom(currentEpochAtom)
  const [{ data: infoData, isPending: infoPending, isError: infoError }] = useAtom(proposalInfoAtom)
  const [{ data: vpData, isPending: vpPending, isError: vpError }] = useAtom(totalVPAtom)

  if (epochPending || infoPending || vpPending) {
    return (
      <div className="grid place-items-center mb-12">
        <Card className="w-[80%] mt-8">
          <CardContent className="grid place-items-center">
            <div className="pt-8">Checking...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const proposal: ProposalInfo = infoData

  let content: ProposalContent = {}
  try {
    content = JSON.parse(proposal.content)
  } catch (error) {
    console.error("Could not parse content field for proposal ", proposal.id)
  }

  // const yay = parseInt(resultData.total_yay_power)
  // const nay = parseInt(resultData.total_nay_power)
  // const abstain = parseInt(resultData.total_abstain_power)
  // const total = parseInt(resultData.total_voting_power)
  // const no_vote = total - (yay + nay + abstain)
  // const epoch = chainStatusData.epoch
  const yay = parseInt(proposal.yayVotes)
  const nay = parseInt(proposal.nayVotes)
  const abstain = parseInt(proposal.abstainVotes)
  const total = parseInt(vpData.totalVotingPower)
  const no_vote = total - (yay + nay + abstain)
  const epoch = epochData.epoch

  //TODO: calculate result
  const result = "passed"

  // result "passed/rejected" only applies if voting is done, otherwise it will always say "rejected" by default
  let status = "n/a"
  let color = ""
  if (epoch < proposal.startEpoch) { status = "Upcoming"; color = "bg-[#cccc00] hover:bg-[#9e9e00] text-zinc-900"; }
  if (epoch >= proposal.startEpoch && epoch <= proposal.endEpoch) { status = "Voting"; color = "bg-[#00baba] hover:bg-[#02544c] text-zinc-900 animate-pulse"; }
  if (epoch > proposal.endEpoch && epoch <= proposal.activationEpoch) {
    if (result === 'passed') { status = "Passed (Grace period)"; color = "bg-[#00e800] hover:bg-[#00b500] text-zinc-900"; }
    else { status = "Rejected"; color = "bg-[#d10000] hover:bg-[#a10000] text-zinc-200"; }
  }
  if (epoch > proposal.activationEpoch) {
    if (result === 'passed') { status = "Passed"; color = "bg-[#00e800] hover:bg-[#00b500] text-zinc-900"; }
    else { status = "Rejected"; color = "bg-[#d10000] hover:bg-[#a10000] text-zinc-200"; }
  }

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8">
        <CardHeader className="flex flex-row justify-between items-baseline gap-4">
          <div className="text-lg"><span className="text-sm text-zinc-300 mr-1">#</span>{proposal.id}</div>
          <CardTitle>{content.title}</CardTitle>
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

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-zinc-500">Details:</div>
            <div className="ml-2">{content.details ?? "n/a"}</div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-zinc-500">Start Epoch:</div>
            <div className="ml-2">{proposal.startEpoch ?? "n/a"}</div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-zinc-500">End Epoch:</div>
            <div className="ml-2">{proposal.endEpoch ?? "n/a"}</div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="text-sm tracking-wider text-zinc-500">Grace Epoch:</div>
            <div className="ml-2">{proposal.activationEpoch ?? "n/a"}</div>
          </div>

          <Separator />
          <div className="flex min-w-full justify-between items-end py-2 mb-4 text-lg mt-2">Tally:</div>
          <div className="flex justify-around items-center gap-24">
            <TallyChart yay={yay} nay={nay} abstain={abstain} total={total} />
            <Table>
              <TableCaption><span className="mr-4">Required quroum:</span>{proposal.tallyType}</TableCaption>
              <TableBody>
                <TableRow>
                  <TableCell className="text-[#86e386]">Yay:</TableCell>
                  <TableCell className="text-zinc-300">{yay}</TableCell>
                  <TableCell className="text-primary">{(yay / total * 100).toFixed(4)} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-[#e04848]">Nay:</TableCell>
                  <TableCell className="text-zinc-300">{nay}</TableCell>
                  <TableCell className="text-primary">{(nay / total * 100).toFixed(4)} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-[#4277f5]">Abstain:</TableCell>
                  <TableCell className="text-zinc-300">{abstain}</TableCell>
                  <TableCell className="text-primary">{(abstain / total * 100).toFixed(4)} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-zinc-500">No Vote:</TableCell>
                  <TableCell className="text-zinc-300">{no_vote}</TableCell>
                  <TableCell className="text-primary">{(no_vote / total * 100).toFixed(4)} %</TableCell>
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
              <pre>{JSON.stringify(proposal.data, null, 2)}</pre>
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