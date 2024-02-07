import { getChainParams } from "@/lib/getParams"
import { truncateHash } from "@/lib/helpers"

export default async function Parameters() {

  const chainParamsData: Promise<ChainParams> = getChainParams()
  const chainParams = await chainParamsData

  return (
    <div className="grid min-h-screen place-items-center bg-dots ml-4">
      <div className="flex flex-col gap-10 text-left w-[75%] px-8 py-10">

        {/* Protocol */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Protocol</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Min epoch duration:</div>
              <div>{chainParams.protocol_params.min_epoch_dur}</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Min blocks / epoch:</div>
              <div>{chainParams.protocol_params.min_blocks_epoch}</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max expected block duration:</div>
              <div>{chainParams.protocol_params.max_block_dur}</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">VP allowlist:</div>
              <div className="max-w-lg">[ {chainParams.protocol_params.tx_allowlist.map(hash => `${truncateHash(hash)}, `)} ]</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Tx allowlist:</div>
              <div className="max-w-lg">[ {chainParams.protocol_params.vp_allowlist.map(hash => `${truncateHash(hash)}, `)} ]</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max block gas:</div>
              <div>{chainParams.protocol_params.max_block_gas}</div>
            </div>
            
          </div>
        </div>

        {/* Proof of Stake */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Proof of Stake</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Block proposer reward:</div>
              <div>{chainParams.pos_params.owned.block_proposer_reward}</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Block vote reward:</div>
              <div>{chainParams.pos_params.owned.block_vote_reward}</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Double-sign slash rate:</div>
              <div>{chainParams.pos_params.owned.duplicate_vote_min_slash_rate}</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Light client attack slash rate:</div>
              <div>{chainParams.pos_params.owned.light_client_attack_min_slash_rate}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Cubic slashing window length:</div>
              <div>{chainParams.pos_params.owned.cubic_slashing_window_length}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Validator stake threshold:</div>
              <div>{chainParams.pos_params.owned.validator_stake_threshold}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Liveness window check:</div>
              <div>{chainParams.pos_params.owned.liveness_window_check}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Liveness threshold:</div>
              <div>{chainParams.pos_params.owned.liveness_threshold}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Rewards gain P:</div>
              <div>{chainParams.pos_params.owned.rewards_gain_p}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Rewards gain D:</div>
              <div>{chainParams.pos_params.owned.rewards_gain_d}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max inflation rate:</div>
              <div>{chainParams.pos_params.owned.max_inflation_rate}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Target staked ratio:</div>
              <div>{chainParams.pos_params.owned.target_staked_ratio}</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max validator slots:</div>
              <div>{chainParams.pos_params.owned.max_validator_slots}</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Pipeline length (epochs):</div>
              <div>{chainParams.pos_params.owned.pipeline_len}</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Unbonding length (epochs):</div>
              <div>{chainParams.pos_params.owned.unbonding_len}</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Votes per token:</div>
              <div>{chainParams.pos_params.owned.tm_votes_per_token}</div>
            </div>

          </div>
        </div>

        {/* Governance */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Governance</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Proposal deposit:</div>
              <div>{chainParams.gov_params.min_proposal_fund}</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max proposal code size:</div>
              <div>{chainParams.gov_params.max_proposal_code_size}</div>
            </div>

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max proposal content size:</div>
              <div>{chainParams.gov_params.max_proposal_content_size}</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Min voting period (epochs):</div>
              <div>{chainParams.gov_params.min_proposal_voting_period}</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Max voting period (epochs):</div>
              <div>{chainParams.pos_params.max_proposal_period}</div>
            </div>
            
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Min grace period (epochs):</div>
              <div>{chainParams.gov_params.min_proposal_grace_epochs}</div>
            </div>

          </div>
        </div>

        {/* Public Goods Funding */}
        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan/80 mb-4">Public Goods Funding</h3>
          <div className="flex flex-col bg-dark/90 border border-light/10 rounded-md p-8 pt-0">

            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">PGF inflation rate:</div>
              <div>{chainParams.pgf_params.pgf_inflation_rate}</div>
            </div>
                        
            <div className="flex justify-between border-b-[1px] border-b-white/10 mt-8">
              <div className="font-bold text-md">Steward inflation rate:</div>
              <div>{chainParams.pgf_params.stewards_inflation_rate}</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
