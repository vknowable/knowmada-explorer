type ValidatorInfo = {
  address: string,
  votingPower: string,
  maxCommission: string,
  commission: string,
  state: string,
  name: string | null,
  email: string | null,
  website: string | null,
  description: string | null,
  discordHandle: string | null,
  avatar: string | null,
  validatorId: string,
}

type ValidatorSetResponse = {
  results: ValidatorInfo[],
  pagination: ValidatorPagination,
}

type ValidatorPagination = {
  page: number,
  perPage: number,
  totalPages: number,
  totalItems: number,
}

// type ValidatorInfo = {
//   nam_address: string,
//   tm_address: string,
//   metadata: ValidatorMetadata | null,
//   stake: string | null,
//   commission: CommissionInfo | null,
//   state: string | null,
//   uptime: {
//     uptime: number,
//   },
// }

type ValidatorMetadata = {
  email: string,
  description: string | null,
  website: string | null,
  discord_handle: string | null,
  avatar: string | null,
  name: string | null,
}

type CommissionInfo = {
  commission_rate: string,
  max_commission_change_per_epoch: string,
}

type ConsensusSetResponse = {
  consensus_count: number,
  below_capacity_count: number,
  consensus_set: ValidatorInfo[],
  pagination: {
    page: number,
    per_page: number,
    total: number,
  }
}

type BondList = {
  address: string,
  amount: string,
}
