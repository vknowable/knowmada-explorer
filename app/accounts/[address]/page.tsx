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
  //   <div className="grid min-h-screen place-items-center bg-dots ml-4">
  //   <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

  //     {/* Overview */}
  //     <div className="p-4">
  //       <h3 className="text-2xl font-bold text-cyan/80 mb-4">Overview</h3>

  //       {is_validator ? (
  //         <div className="mb-4 text-sm">
  //         (View the validator page for <Link className="text-yellow hover:text-yellow/50" href={`/validators/${address}`}>{address}</Link> instead)
  //       </div>
  //       )
  //       : (<></>)}

  //       <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-4">
          
  //         <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
  //           <div className="font-bold text-md">Address:</div>
  //           <div>{address}</div>
  //         </div>

  //         <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
  //           <div className="font-bold text-md">Balance:</div>
  //           <div>{parseInt(account.native_balance)/1000000 ?? "n/a"}</div>
  //         </div>
                    
  //         <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
  //           <div className="font-bold text-md">Account type:</div>
  //           <div>{account_type}</div>
  //         </div>
                    
  //         <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
  //           <div className="font-bold text-md">Is validator:</div>
  //           <div>{is_validator ? "Yes" : "No"}</div>
  //         </div>
                    
  //         <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
  //           <div className="font-bold text-md">Is PGF steward:</div>
  //           <div>{is_steward ? "Yes" : "No"}</div>
  //         </div>


  //       </div>
  //     </div>

  //     {/* Assets */}
  //     <div className="p-4">
  //       <h3 className="text-2xl font-bold text-cyan/80 mb-4">Assets</h3>
  //       <div className="grid min-h-screen place-items-center bg-dark/90 border border-light/10 rounded-md p-8">

  //         {/* Tokens table */}
  //         <table className="min-w-full bg-black border border-light">
  //           <thead>
  //             <tr>
  //               <th className="py-2 px-4 border-b text-left">Address</th>
  //               <th className="py-2 px-4 border-b text-left">Alias</th>
  //               <th className="py-2 px-4 border-b text-right">Balance</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {placeholder.map((asset, i) =>
  //               <tr key={i}>
  //                 <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/accounts/${asset.address}`}>{asset.address}</Link></td>
  //                 <td className="py-2 px-4 border-b">NAM</td>
  //                 <td className="py-2 px-4 border-b">100</td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>

  //       </div>
  //     </div>
  //   </div>
  // </div>
  )
}