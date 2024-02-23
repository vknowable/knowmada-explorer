'use client'

// import { getProposal, getProposalResult } from "@/lib/getProposal"
// import { getLastEpoch } from "@/lib/getChainStatus"
import { useAtom } from "jotai"
import { chainStatusAtom, shieldedListAtom } from "@/app/store/store"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"


export default function ProposalInfo() {

  const nativeAlias = process.env.NEXT_PUBLIC_NATIVE_TOKEN_ALIAS ?? ""

  const [{ data: chainStatusData, isPending: statusPending, isError }] = useAtom(chainStatusAtom)
  const [{ data: shieldedData, isPending: shieldedPending, isError: shieldedError }] = useAtom(shieldedListAtom)

  if (statusPending || shieldedPending) {
    return (
      <div className="grid place-items-center mb-12">
      <Card className="w-[70%] mt-8">
        <CardHeader>
          <CardTitle>Shielded Assets:</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Checking...</div>
        </CardContent>
      </Card>
    </div>
    )
  }
  console.log(shieldedData)

  // TODO: does amount here accurately reflect each token denom decimal places?
  // sort so that native token appears at top of list
  const targetAddress = chainStatusData.staking_info.native_token
  const shieldedArray: AssetAmount[] = Object.entries(shieldedData.shielded_assets)
    .map(([address, amount]) => ({ address, amount: amount as number }))
    .sort((a, b) => {
        if (a.address === targetAddress) return -1;
        if (b.address === targetAddress) return 1;
        return 0;
    });

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[70%] mt-8">
        <CardHeader>
          <CardTitle>Shielded Assets:</CardTitle>
          <CardDescription>Total: {shieldedArray.length}{chainStatusData.native_token}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {shieldedArray.map(asset => <AssetRow address={asset.address} amount={asset.amount} nativeAddress={targetAddress} nativeAlias={nativeAlias} key={asset.address} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const AssetRow = ({ address, amount, nativeAddress, nativeAlias }: { address: string, amount: number, nativeAddress: string, nativeAlias: string }) => {
  let alias: string =  ""
  let extraClasses: string = ""
  if (address === nativeAddress) {
    alias = nativeAlias
    extraClasses = "border border-primary"
  }
  return (
    <TableRow className={extraClasses}>
      <TableCell><Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/accounts/${address}`}>{address}</Link></TableCell>
      <TableCell>{alias}</TableCell>
      <TableCell className="text-right">{amount.toFixed(4)}</TableCell>
    </TableRow>
  )
}