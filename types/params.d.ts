type ChainParams = {
  unbondingLength: string,
  pipelineLength: string,
  epochsPerYear: string,
  apr: string,
  nativeTokenAddress: string,
  chainId: string,
  genesisTime: string,
  minDuration: string,
  minNumOfBlocks: string,
  checksums: Checksums,
  epochSwitchBlocksDelay: string,
}

type Checksums = {
  "tx_bond.wasm": string,
  "tx_change_validator_commission.wasm": string,
  "tx_change_validator_metadata.wasm": string,
  "tx_claim_rewards.wasm": string,
  "tx_init_proposal.wasm": string,
  "tx_redelegate.wasm": string,
  "tx_reveal_pk.wasm": string,
  "tx_transfer.wasm": string,
  "tx_unbond.wasm": string,
  "tx_vote_proposal.wasm": string,
  "tx_withdraw.wasm": string,
}

type CurrentEpoch = {
  latestEpoch: string,
}

// type ChainParams = {
//   protocol_params: {
//     min_epoch_dur: number,
//     min_blocks_epoch: number,
//     max_block_dur: number,
//     tx_allowlist: string[],
//     vp_allowlist: string[],
//     max_block_gas: number
//   },
//   pos_params: {
//     owned: {
//       max_validator_slots: number,
//       pipeline_len: number,
//       unbonding_len: number,
//       tm_votes_per_token: string,
//       block_proposer_reward: string,
//       block_vote_reward: string,
//       max_inflation_rate: string,
//       target_staked_ratio: string,
//       duplicate_vote_min_slash_rate: string,
//       light_client_attack_min_slash_rate: string,
//       cubic_slashing_window_length: number,
//       validator_stake_threshold: string,
//       liveness_window_check: number,
//       liveness_threshold: string,
//       rewards_gain_p: string,
//       rewards_gain_d: string
//     },
//     max_proposal_period: number
//   },
//   pgf_params: {
//     stewards: string[],
//     pgf_inflation_rate: string,
//     stewards_inflation_rate: string
//   },
//   gov_params: {
//     min_proposal_fund: string,
//     max_proposal_code_size: number,
//     min_proposal_voting_period: number,
//     max_proposal_period: number,
//     max_proposal_content_size: number,
//     min_proposal_grace_epochs: number
//   }
// }