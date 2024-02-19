import { getBlockAtHeight, getSignaturesByBlockHash } from "@/lib/getBlock";
import { truncateHash, timeAgo, humanizedTime } from "@/lib/helpers";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import InfoRow from "@/app/components/InfoRow";
import Link from "next/link";

type Props = {
  params: {
    blockHeight: string
  }
}

export default async function page({ params: { blockHeight } }: Props) {
  const height = parseInt(blockHeight)

  const blockData: Promise<BlockResponse> = getBlockAtHeight(height)
  const block = await blockData

  const signaturesData: Promise<SignaturesResponse> = getSignaturesByBlockHash(block.block_id)
  const signatures = await signaturesData

  const blockTxs: TxSummary[] = []
  for (const tx of block.tx_hashes) {
    blockTxs.push({
      height: block.header.height,
      time: block.header.time,
      result: "Ok", // TODO: how to find this correctly
      hash_id: tx.hash_id,
      tx_type: tx.tx_type,
    })
  }

  const formattedDate = humanizedTime(block.header.time)

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Block Details:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="invisible h-0"></TableHead>
                <TableHead className="invisible h-0"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <InfoRow a="Height:" b={block.header.height} />
              <InfoRow a="Hash:" b={block.block_id} />
              <TableRow>
                <TableCell>Proposer:</TableCell>
                <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/validators/${block.header.proposer_address}`}>{block.header.proposer_address}</Link></TableCell>
              </TableRow>
              <InfoRow a="Time:" b={formattedDate} />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Signatures:</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] overflow-y-scroll">
          <Table>
            <TableHeader><TableHead className="invisible h-0"></TableHead></TableHeader>
            <TableBody>
              {signatures.signatures.map((signature, index) =>
                signature.validator_address === null ? <TableRow key={index} className="invisible"></TableRow>
                  : <SignatureRow key={signature.validator_address} signature={signature.validator_address} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Transactions:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableHead>Block</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Type</TableHead>
              {/* <TableHead></TableHead> */}
              <TableHead>Time</TableHead>
            </TableHeader>
            <TableBody>
              {blockTxs.map(tx =>
                <TxRow key={tx.hash_id} tx={tx} />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const SignatureRow = ({ signature }: { signature: string }) => {
  return (
    <TableRow>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/validators/${signature}`}>{signature}</Link></TableCell>
    </TableRow>
  )
}

const TxRow = ({ tx }: { tx: TxSummary }) => {
  return (
    <TableRow>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/blocks/${tx.height}`}>{tx.height}</Link></TableCell>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/transactions/${tx.hash_id}`}>{truncateHash(tx.hash_id, 12, 12)}</Link></TableCell>
      <TableCell><Badge>{tx.tx_type}</Badge></TableCell>
      <TableCell>{timeAgo(tx.time)}</TableCell>
    </TableRow>
  )
}