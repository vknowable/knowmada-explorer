'use client'

import { useAtom } from "jotai"
import { chainParamsAtom } from "@/app/store/store"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import InfoRow from "@/app/components/InfoRow"


export default function ProposalInfo() {

  const [{ data: chainParamsData, isPending: statusPending, isError }] = useAtom(chainParamsAtom)

  if (statusPending) {
    return (
      <div className="grid place-items-center mb-12">
        <Card className="w-[50%] mt-8">
          <CardContent className="grid place-items-center">
            <div className="pt-8">Checking...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Overview:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <InfoRow a="PGF inflation rate:" b={chainParamsData.pgf_params.pgf_inflation_rate} align="text-right" />
              <InfoRow a="Steward inflation rate:" b={chainParamsData.pgf_params.stewards_inflation_rate} align="text-right" />
              <InfoRow a="PGF treasury amount:" b="Not supported yet" align="text-right" />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Stewards:</CardTitle>
          <CardDescription>Total: {chainParamsData.pgf_params.stewards.length}</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableBody>
              {chainParamsData.pgf_params.stewards.map((address: string, index: number) =>
                address === null ? <TableRow key={index} className="invisible"></TableRow>
                  : <AddressRow key={address} address={address} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Disbursements:</CardTitle>
          <CardDescription>Not supported yet</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

const AddressRow = ({ address }: { address: string }) => {
  return (
    <TableRow>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/accounts/${address}`}>{address}</Link></TableCell>
    </TableRow>
  )
}