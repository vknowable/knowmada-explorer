import Link from "next/link"

export default function Pgf() {

  const placeholder: BondList[] = []
  return (

    <div className="grid min-h-screen place-items-center bg-dots ml-4">
    <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

      {/* Overview */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Overview</h3>
        <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">

          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
            <div className="font-bold text-md">PGF inflation rate:</div>
            <div>a</div>
          </div>
          
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
            <div className="font-bold text-md">Steward inflation rate:</div>
            <div>a</div>
          </div>
          
          <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
            <div className="font-bold text-md">PGF treasury amount:</div>
            <div>a</div>
          </div>
          
        </div>
      </div>

      {/* Stewards */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Stewards</h3>
        <div className="grid min-h-screen place-items-center bg-dark/90 border border-light/10 rounded-md p-8">

          <div>Total stewards: x</div>

          {/* Stewards table */}
          <table className="min-w-full bg-black border border-light">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {placeholder.map((bond, i) =>
                <tr key={i}>
                  <td className="py-2 px-4 border-b">tnam...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disbursements */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-cyan/80 mb-4">Disbursements</h3>
        <div className="grid min-h-screen place-items-center bg-dark/90 border border-light/10 rounded-md p-8">

          <div>Total disbursements: x</div>

          {/* Disbursements table */}
          <table className="min-w-full bg-black border border-light">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Address</th>
                <th className="py-2 px-4 border-b text-right">Amount / epoch</th>
              </tr>
            </thead>
            <tbody>
              {placeholder.map((bond, i) =>
                <tr key={i}>
                  <td className="py-2 px-4 border-b">tnam...</td>
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
