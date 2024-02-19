'use client'

import SupplyChart from "./SupplyChart"
import { NATIVE_SCALE } from "@/lib/helpers"
import { useAtom } from "jotai"
import { chainStatusAtom } from "../store/store"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"


export default function TokenSupply() {

  const [{ data, isPending, isError }] = useAtom(chainStatusAtom)

  if (isPending) {
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

  const bonded = parseInt(data.staking_info.bonded_supply)
  const total = parseInt(data.staking_info.total_supply)

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
          <TableCaption>Native token: {data.staking_info.native_token}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="text-right">Tokens</TableHead>
              <TableHead className="text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Bonded:</TableCell>
              <TableCell className="text-right">{bonded_str}</TableCell>
              <TableCell className="text-right">{(bonded/total * 100).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Unbonded:</TableCell>
              <TableCell className="text-right">{unbonded_str}</TableCell>
              <TableCell className="text-right">{(unbonded/total * 100).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total:</TableCell>
              <TableCell className="text-right">{total_str}</TableCell>
              <TableCell className="text-right">100.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  )
}