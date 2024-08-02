'use client'

import { useAtom } from "jotai"
// import { chainStatusAtom } from "../store/store"
import { allValsAtom } from "../store/store"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"

export default function ActiveVals() {

  const [{ data, isPending, isError, isFetched }] = useAtom(allValsAtom)

  let activeVals = 0
  let totalVals = 0
  if (isFetched) {
    totalVals = data.length
    activeVals = data.filter((validator: ValidatorInfo) => validator.state === "consensus").length
  }

  return (
    <Card className="min-w-[100%] min-h-36 px-20">
      <CardHeader>
        <CardTitle>Active Validators:</CardTitle>
        <CardContent className="pt-2 text-center">
          {isPending ? <div>Checking...</div>
          : <div className="text-zinc-300"><span className="text-lg font-bold text-primary">{activeVals}</span> out of <span className="text-lg font-bold text-primary">{totalVals}</span></div>
          }
        </CardContent>
      </CardHeader>
    </Card>
  )
}