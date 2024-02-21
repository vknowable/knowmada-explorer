import { getBlockByHash } from "@/lib/getBlock"
import { getTransaction } from "@/lib/getTransaction"
import { humanizedTime } from "@/lib/helpers"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import InfoRow from "@/app/components/InfoRow"

type Props = {
  params: {
    txHash: string
  }
}

export default async function page({ params: { txHash: hash } }: Props) {
  const txData: Promise<TxResponse> = getTransaction(hash)
  const tx = await txData

  const blockData: Promise<BlockResponse> = getBlockByHash(tx.block_id)
  const block = await blockData
  const formattedDate = humanizedTime(block.header.time)

  // get a more descriptive name than 'Decrypted', ie: Transfer, Bond, etc.
  const txType: string = tx.tx === null ? "Wrapper" : Object.keys(tx.tx)[0]
  const txMemo: string = tx.memo ?? ""

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Transaction Details:</CardTitle>
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
              <InfoRow a="Hash:" b={tx.hash} />
              <TableRow>
                <TableCell>Height:</TableCell>
                <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/blocks/${block.header.height}`}>{block.header.height}</Link></TableCell>
              </TableRow>
              <InfoRow a="Time:" b={formattedDate} />
              <TableRow>
                <TableCell>Type:</TableCell>
                <TableCell><Badge>{txType}</Badge></TableCell>
              </TableRow>
              {/* <InfoRow a="Result" b="Ok" /> */}
              <InfoRow a="Memo:" b={txMemo} />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Content:</CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="pt-8">
            <CardContent>
              <pre>{JSON.stringify(tx.tx, null, 2)}</pre>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
