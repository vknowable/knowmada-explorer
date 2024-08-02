import { getAccount } from "@/lib/getAccount"
import { getAllVals } from "@/lib/getValidator"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import InfoRow from "@/app/components/InfoRow"
import { arrayBuffer } from "stream/consumers"

type Props = {
  params: {
    address: string
  }
}

export default async function page({ params: { address } }: Props) {

  const nativeAlias = process.env.NEXT_PUBLIC_NATIVE_TOKEN_ALIAS ?? ""

  // const accountData: Promise<AccountSummary> = getAccount(address)
  const balanceData: Promise<AccountBalance[]> = getAccount(address)
  const balances = await balanceData

  const validatorsData: Promise<ValidatorInfo[]> = getAllVals()
  const validators = await validatorsData

  // const is_steward = account.is_steward ?? false
  // const is_validator = account.is_validator ?? false
  // const account_type = account.known_address == true ? "Established" : "Implicit"
  // const balance = (parseInt(account.native_balance)/1000000).toFixed(4) ?? "n/a"



  //TODO: check if steward, established
  const isSteward = false
  // check if address is in list of validators
  const isValidator = validators.some(val => val.address === address)
  const accountType = "todo"

  //TODO: this placeholder just gets the first token balance; we need to check by token address
  const balance: AccountBalance = balances[0] ?? {tokenAddress: "tnam1q87wtaqqtlwkw927gaff34hgda36huk0kgry692a", balance: "0"}

  const placeholder: BondList[] = []

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Account Details:</CardTitle>
          {isValidator ?
          <CardDescription>(View the validator page for <Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/validators/${address}`}>{address}</Link> instead)</CardDescription>
          : <></>
          }
        </CardHeader>
        <CardContent className="grid place-items-center">
          <div className="w-[75%] mt-4">
          <Table>
            <TableBody>
              <InfoRow a="Address:" b={address} />
              <InfoRow a="Balance:" b={`${balance.balance} ${nativeAlias}`} />
              <InfoRow a="Account Type:" b={accountType} />
              <InfoRow a="Is Validator:" b={isValidator ? "Yes" : "No"} />
              <InfoRow a="Is PGF Steward:" b={isSteward ? "Yes" : "todo"} />
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