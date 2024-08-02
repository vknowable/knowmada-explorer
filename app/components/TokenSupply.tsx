'use client'

import SupplyChart from "./SupplyChart"
import { NATIVE_SCALE } from "@/lib/helpers"
import { useAtom } from "jotai"
// import { chainStatusAtom } from "../store/store"
import { totalVPAtom, chainParamsAtom } from "../store/store"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"


export default function TokenSupply() {
  const nativeAlias = process.env.NEXT_PUBLIC_NATIVE_TOKEN_ALIAS ?? ""

  const [{ data: dataVP, isPending: isPendingVP, isError: isErrorVP }] = useAtom(totalVPAtom)
  const [{ data: dataParams, isPending: isPendingParams, isError: isErrorParams }] = useAtom(chainParamsAtom)

  if (isPendingVP || isPendingParams) {
    return (
      <div className="col-span-2 min-w-[100%] min-h-48 flex justify-center">
      <Card className="w-full px-32">
        <CardHeader className="text-center">
          <CardTitle>Token Supply:</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div>Checking...</div>
        </CardContent>
      </Card>
      </div>
    )
  }

  // const bonded = parseInt(data.staking_info.bonded_supply)
  // const total = parseInt(data.staking_info.total_supply)

  // const bonded_str = (bonded / NATIVE_SCALE).toFixed(0)
  // const total_str = (total / NATIVE_SCALE).toFixed(0)
  // const unbonded = total - bonded
  // const unbonded_str = (unbonded / NATIVE_SCALE).toFixed(0)

  const bonded = parseInt(dataVP.totalVotingPower)/2
  const total = parseInt(dataVP.totalVotingPower)

  const bonded_str = (bonded / NATIVE_SCALE).toFixed(0)
  const total_str = (total / NATIVE_SCALE).toFixed(0)
  const unbonded = total - bonded
  const unbonded_str = (unbonded / NATIVE_SCALE).toFixed(0)

  return (
    <div className="col-span-2 min-w-[100%] flex justify-center">
    <Card className="w-full px-32">
      <CardHeader className="text-center">
        <CardTitle>Token Supply:</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between gap-24">
        <SupplyChart bonded={bonded} total={total}/>
        <Table>
          <TableCaption>Native token:<br /><span className="mr-4">{dataParams.nativeTokenAddress}</span>(<span className="text-primary mx-1">{nativeAlias}</span>)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="text-right">Tokens</TableHead>
              <TableHead className="text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-zinc-300">Bonded:</TableCell>
              <TableCell className="text-right">{bonded_str}</TableCell>
              <TableCell className="text-right text-primary">{(bonded/total * 100).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-zinc-300">Unbonded:</TableCell>
              <TableCell className="text-right">{unbonded_str}</TableCell>
              <TableCell className="text-right text-primary">{(unbonded/total * 100).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-zinc-300">Total:</TableCell>
              <TableCell className="text-right">{total_str}</TableCell>
              <TableCell className="text-right text-primary">100.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  )
}