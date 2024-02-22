import { getAccount } from "@/lib/getAccount"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import InfoRow from "@/app/components/InfoRow";

type Props = {
  params: {
    address: string
  }
}

export default async function page({ params: { address } }: Props) {

  const accountData: Promise<AccountSummary> = getAccount(address)
  const account = await accountData

  const is_steward = account.is_steward ?? false
  const is_validator = account.is_validator ?? false
  const account_type = account.known_address == true ? "Established" : "Implicit"
  const balance = (parseInt(account.native_balance)/1000000).toFixed(4) ?? "n/a"

  const placeholder: BondList[] = []

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Account Details:</CardTitle>
          {is_validator ?
          <CardDescription>(View the validator page for <Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/validators/${address}`}>{address}</Link> instead)</CardDescription>
          : <></>
          }
        </CardHeader>
        <CardContent className="grid place-items-center">
          <div className="w-[75%] mt-4">
          <Table>
            <TableBody>
              <InfoRow a="Address:" b={address} />
              <InfoRow a="Balance:" b={balance} />
              <InfoRow a="Account Type:" b={account_type} />
              <InfoRow a="Is Validator:" b={is_validator ? "Yes" : "No"} />
              <InfoRow a="Is PGF Steward:" b={is_steward ? "Yes" : "No"} />
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Other Assets:</CardTitle>
          <CardDescription>Not supported yet</CardDescription>
        </CardHeader>
      </Card>

    </div>
  )
}