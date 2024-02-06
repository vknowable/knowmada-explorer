type ChainStatus = {
  chain_id: string,
  latest_height: string,
  last_block_time: string,
  staking_info: {
    active_validators: number,
    total_validators: number,
    bonded_supply: string,
    total_supply: string,
    native_token: string,
  }
}