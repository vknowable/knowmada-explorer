'use client'

import { useAtom } from "jotai"
import { blockChainResponseAtom } from "../store/store";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"

export default function LatestBlock() {
  const [{ data: blockChainData, isFetchingNextPage, fetchNextPage, hasNextPage, isError, isPending }] = useAtom(blockChainResponseAtom);

  return (
    <Card className="min-w-[100%] min-h-36 px-20">
      <CardHeader>
        <CardTitle>Latest Block:</CardTitle>
        <CardContent className="pt-2 text-center">
          {isPending ? <div>Checking...</div>
          : <div className="text-lg font-bold text-primary">{blockChainData?.pages[0][0].header.height}</div>
          }
        </CardContent>
      </CardHeader>
    </Card>
  )
}