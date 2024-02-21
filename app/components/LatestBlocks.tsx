'use client'

import { truncateHash, timeAgo } from "@/lib/helpers"
import { useAtom } from "jotai"
import { blockChainResponseAtom } from "../store/store"
import { Md5 } from "ts-md5"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"

type Props = {
  fullView: boolean,
}

export default function LatestBlocks({ fullView }: Props) {

  const [{ data: blockChainData, isFetchingNextPage, fetchNextPage, hasNextPage, isError }] = useAtom(blockChainResponseAtom);

  const nextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }

  return (

    <Card className="min-w-[100%] min-h-[100%]">
      <CardHeader className="flex flex-row justify-between items-baseline">
        <CardTitle>Latest Blocks</CardTitle>
        {fullView == true ? <></>
          : <CardDescription className="pl-2"><Link className="text-[#0DD] hover:text-[#0DD]/50" href={'/transactions/'}>See More</Link></CardDescription>
        }
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Height</TableHead>
              <TableHead>Proposer</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Txs</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blockChainData?.pages?.map(page => page.map((block: BlockResponse, index: number) =>
              <Block block={block} key={block.block_id + '-' + index} fullView={fullView} />
            ))}
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

const Block = ({ block, fullView }: { block: BlockResponse, fullView: boolean }) => {

  return (
    <TableRow>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/blocks/${block.header.height}`}>{block.header.height}</Link></TableCell>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/validators/${block.header.proposer_address}`}>{fullView ? truncateHash(block.header.proposer_address, 8, 8) : truncateHash(block.header.proposer_address, 4, 4)}</Link></TableCell>
      <TableCell className="text-zinc-300">{fullView ? truncateHash(block.block_id, 8, 8) : truncateHash(block.block_id, 4, 4)}</TableCell>
      <TableCell className="text-zinc-300">{block.tx_hashes.length}</TableCell>
      <TableCell className="text-zinc-300">{timeAgo(block.header.time)}</TableCell>
    </TableRow>
  )
}

function hash(str: string): string {
  return Md5.hashStr(str);
}