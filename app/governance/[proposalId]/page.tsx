import ProposalInfo from "@/app/components/ProposalInfo"
// import { getProposal, getProposalResult } from "@/lib/getProposal"
// import { getLastEpoch } from "@/lib/getChainStatus"
import { useAtom } from "jotai"
import { chainStatusAtom, proposalInfoAtom, proposalResultAtom, proposalIdAtom } from "@/app/store/store"
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

export default function page({ params: { proposalId } }: Props) {

  return (
    <div className="">
      <ProposalInfo proposalId={proposalId} />
    </div>
  )
}