'use client'

import { blockChainResponseAtom } from "../store/store"
import { useAtom } from "jotai"
import { truncateHash, timeAgo } from "@/lib/helpers"
import Link from "next/link"
import { Md5 } from "ts-md5"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = {
  fullView: boolean,
}

export default function LatestTransactions({ fullView }: Props) {

  const [{ data: blockChainData, isFetchingNextPage, fetchNextPage, hasNextPage, isError }] = useAtom(blockChainResponseAtom);
  const recentTxs: TxSummary[]= []
  const PER_PAGE = fullView ? undefined : 10

  if (blockChainData) {
    for (const page of blockChainData?.pages) {
      for (const block of page) {
        for (const tx of block.tx_hashes) {
          if (tx.tx_type !== 'Wrapper') {
            recentTxs.push({
              height: block.header.height,
              time: block.header.time,
              hash_id: tx.hash_id,
              tx_type: tx.tx_type,
              result: "Ok"
            })
          }
        }
      }
    }
  }

  const nextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }

  return (
    <Card className="min-w-[100%] min-h-[100%]">
      <CardHeader className="flex flex-row justify-between items-baseline">
        <CardTitle>Latest Transactions</CardTitle>
        {fullView == true ? <></>
          : <CardDescription className="pl-2"><Link className="text-[#0DD] hover:text-[#0DD]/50" href={'/transactions/'}>See More</Link></CardDescription>
        }
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Wrapper transactions omitted; can still be searched for by hash</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Block</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {recentTxs.slice(0, PER_PAGE).map((tx: TxSummary, index: number) =>
              <Tx tx={tx} key={hash(tx.hash_id) + '-' + index} fullView={fullView} />
            )}
          </TableBody>
        </Table>
        <CardFooter>
        {fullView ?
          <Button className="rounded mt-2" disabled={!hasNextPage || isFetchingNextPage} onClick={nextPage}>Load More</Button>
          : <></>
        }
        </CardFooter>
      </CardContent>
    </Card>
  )
}

const Tx = ({ tx, fullView }: { tx: TxSummary, fullView: boolean }) => {

  return (
    <TableRow>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/blocks/${tx.height}`}>{tx.height}</Link></TableCell>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/transactions/${tx.hash_id}`}>{fullView ? truncateHash(tx.hash_id, 8, 8) : truncateHash(tx.hash_id, 4, 4)}</Link></TableCell>
      <TableCell><Badge>{tx.tx_type}</Badge></TableCell>
      <TableCell>{timeAgo(tx.time)}</TableCell>
    </TableRow>
  )
}

function hash(str: string): string {
  return Md5.hashStr(str);
}