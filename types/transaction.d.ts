type TxSimple = {
  tx_type: string,
  hash_id: string
}

type TxSummary = {
  tx_type: string,
  hash_id: string,
  height: string,
  time: string,
  result: string,
}

type TxResponse = {
  hash: string,
  block_id: string,
  tx_type: string,
  wrapper_id: string,
  fee_amount_per_gas_unit: string | null,
  fee_token: string | null,
  gas_limit_multiplier: number | null,
  code: string,
  data: string,
  tx: Transfer|Bond|RevealPK|VoteProposal|BecomeValidator|Unbond|Withdraw|InitAccount|UpdateAccount|ResignSteward|UpdateStewardCommission|EthPoolBridge|Ibc|null,
}

type Transfer = {
  source: string,
  target: string,
  token: string,
  amount: string,
  key: string | null,
  shielded: string | null,
}

type Bond = {
  validator: string,
  amount: string,
  source: string | null,
}

type RevealPK = {
  ed25519?: string | null,
  secp256k1?: string | null,
}

type VoteProposal = {
  id: number,
  vote: string,
  voter: string,
  delegations: string[],
}

type BecomeValidator = {
  address: string,
  consensus_key: string,
  eth_cold_key: string,
  eth_hot_key: string,
  protocol_key: string,
  commission_rate: string,
  max_commission_rate_change: string,
  email: string,
  description: string | null,
  website: string | null,
  discord_handle: string | null,
  avatar: string | null,
}

type Unbond = {
  validator: string,
  amount: string,
  source: string | null,
}

type Withdraw = {
  validator: string,
  source: string | null,
}

type InitAccount = {
  public_keys: string[],
  vp_code_hash: string,
  threshold: number,
}

type UpdateAccount = {
  addr: string,
  vp_code_hash: string | null,
  public_keys: string[],
  threshold: number | null,
}

type ResignSteward = {
  established?: string | null,
  implicit?: string | null,
  internal?: string | null,
}

// TODO: pretty sure this is incorrect
type UpdateStewardCommission = {
  steward: string,
  commission: {
    address: string,
    commission: string,
  },
}

type EthPoolBridge = {
  transfer: {
    kind: string,
    asset: string,
    recipient: string,
    sender: string,
    amount: string,
  }
}

type Ibc = {
  MsgTransfer?: {
    type_url: string,
    value: number[],
  },
  Any?: {
    type_url: string,
    value: number[],
  },
}
