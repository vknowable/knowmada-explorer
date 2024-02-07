import Link from "next/link"

type Props = {
  params: {
    address: string
  }
}

export default async function page({ params: { address } }: Props) {

  const placeholder: BondList[] = []

  return (
    <div className="grid min-h-screen place-items-center bg-dots ml-4">
    <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

      {/* Overview */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Overview</h3>
        <div className="mb-4 text-sm">(View the validator info page for <Link className="text-yellow hover:text-yellow/50" href={`/validators/${address}`}>{address}</Link> instead)</div>
        <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-4">
          
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
            <div className="font-bold text-md">Address:</div>
            <div>a</div>
          </div>
                    
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
            <div className="font-bold text-md">Account type:</div>
            <div>a</div>
          </div>
                    
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
            <div className="font-bold text-md">Is validator:</div>
            <div>a</div>
          </div>
                    
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-4">
            <div className="font-bold text-md">Is PGF steward:</div>
            <div>a</div>
          </div>

        </div>
      </div>

      {/* Assets */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Assets</h3>
        <div className="grid min-h-screen place-items-center bg-dark/90 border border-light/10 rounded-md p-8">

          {/* Tokens table */}
          <table className="min-w-full bg-black border border-light">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Address</th>
                <th className="py-2 px-4 border-b text-left">Alias</th>
                <th className="py-2 px-4 border-b text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {placeholder.map((asset, i) =>
                <tr key={i}>
                  <td className="py-2 px-4 border-b"><Link className="text-yellow hover:text-yellow/50" href={`/accounts/${asset.address}`}>{asset.address}</Link></td>
                  <td className="py-2 px-4 border-b">NAM</td>
                  <td className="py-2 px-4 border-b">100</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>
  )
}