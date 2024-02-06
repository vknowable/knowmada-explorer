type ValidatorInfo = {
  nam_address: string,
  tm_address: string,
  metadata: ValidatorMetadata | null,
  stake: string | null,
  commission: CommissionInfo | null,
  state: string | null,
  uptime: {
    uptime: number,
  },
}

type ValidatorMetadata = {
  email: string,
  description: string | null,
  website: string | null,
  discord_handle: string | null,
  avatar: string | null,
}

type CommissionInfo = {
  commission_rate: string,
  max_commission_change_per_epoch: string,
}

type ConsensusSetResponse = {
  consensus_count: number,
  below_capacity_count: number,
  consensus_set: ValidatorInfo[],
}

type BondList = {
  address: string,
  amount: string,
}
