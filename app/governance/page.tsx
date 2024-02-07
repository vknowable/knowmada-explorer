import Link from "next/link"

export default function Governance() {

  const placeholder: BondList[] = []

  return (
    <div className="grid  place-items-center bg-dots ml-4">
      <div className="flex flex-col gap-10 text-left w-[75%] px-0 py-10">

        {/* Proposals */}
        <div className="px-0">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Proposals</h3>
          <div className="mb-4 text-sm">A total of x proposals found</div>

          {/* Proposal card  */}
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8">

            <div className="flex min-w-full justify-between items-end border-b-2 border-light pb-2 mb-4">
              <div className="text-lg font-bold text-left"><span className="text-sm text-white/60 mr-1">#</span>1</div>
              <div className="grow pl-8"><Link className="text-yellow hover:text-yellow/50 text-lg font-bold text-left" href={`/governance`}>Proposal Title</Link></div>
              <div className="text-sm text-center border border-green-600 bg-green-800/40 rounded-md p-2 py-1">Voting</div>
            </div>

            <div className="flex flex-col mb-4">
              <div className="text-sm tracking-wider text-white/40">Summary:</div>
              <div className="ml-2">Lorem ipsum is placeholder text</div>
            </div>

            <div>
              <div className="text-sm tracking-wider text-white/40">Description:</div>
              <div className="ml-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
