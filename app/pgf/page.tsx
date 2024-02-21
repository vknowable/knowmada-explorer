import { getChainParams } from "@/lib/getParams"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import InfoRow from "@/app/components/InfoRow"

export default async function Pgf() {

  const chainParamsData: Promise<ChainParams> = getChainParams()
  const chainParams = await chainParamsData

  const placeholder: BondList[] = []
  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Overview:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <InfoRow a="PGF inflation rate:" b={chainParams.pgf_params.pgf_inflation_rate} align="text-right" />
              <InfoRow a="Steward inflation rate:" b={chainParams.pgf_params.stewards_inflation_rate} align="text-right" />
              <InfoRow a="PGF treasury amount:" b="Not supported yet" align="text-right" />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Stewards:</CardTitle>
          <CardDescription>Total: {chainParams.pgf_params.stewards.length}</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableBody>
              {chainParams.pgf_params.stewards.map((address, index) =>
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