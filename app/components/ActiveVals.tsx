'use client'

import { useAtom } from "jotai"
import { chainStatusAtom } from "../store/store"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"

export default function ActiveVals() {

  const [{ data, isPending, isError }] = useAtom(chainStatusAtom)

  return (
    <Card className="min-w-[100%] min-h-36 px-20">
      <CardHeader>
        <CardTitle>Active Validators:</CardTitle>
        <CardContent className="pt-2 text-center">
          {isPending ? <div>Checking...</div>
          : <div><span className="text-lg font-bold">{data.staking_info.active_validators}</span> out of <span className="text-lg font-bold">{data.staking_info.total_validators}</span></div>
          }
        </CardContent>
      </CardHeader>
    </Card>
  )
}