import { getChainParams } from "@/lib/getParams"

export default async function Parameters() {

  // const chainParamsData: Promise<ChainParams> = getChainParams()
  // const chainParams = await chainParamsData

  return (
    <div className="grid min-h-screen place-items-center bg-dots ml-4">
      <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

        {/* Protocol */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Protocol</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Min epoch duration:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Min number of blocks:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max block duration:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">VP allowlist:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Tx allowlist:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max block gas:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Fee unshielding gas limit:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Fee unshielding descriptions limit:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Gas cost table:</div>
              <div>a</div>
            </div>
            
          </div>
        </div>

        {/* Proof of Stake */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Proof of Stake</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Block proposer reward:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Block vote reward:</div>
              <div>a</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Double-sign slash rate:</div>
              <div>a</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Light client attack slash rate:</div>
              <div>a</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max validator slots:</div>
              <div>a</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Pipeline length (epochs):</div>
              <div>a</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Unbonding length (epochs):</div>
              <div>a</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Votes per token:</div>
              <div>a</div>
            </div>

          </div>
        </div>

        {/* Governance */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Governance</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Proposal deposit:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max proposal code size:</div>
              <div>a</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max proposal content size:</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Min voting period (epochs):</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max voting period (epochs):</div>
              <div>a</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Min grace period (epochs):</div>
              <div>a</div>
            </div>

          </div>
        </div>

        {/* Public Goods Funding */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Public Goods Funding</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">PGF inflation rate:</div>
              <div>a</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Steward inflation rate:</div>
              <div>a</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
