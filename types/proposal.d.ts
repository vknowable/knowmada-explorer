type ProposalInfo = {
  id: number,
  content: {
    abstract: string,
    authors: string,
    created: string,
    details: string,
    discussions_to: string,
    license: string,
    motivation: string,
    title: string,
  },
  author: string,
  type: Default | PGFSteward,
  voting_start_epoch: number,
  voting_end_epoch: number,
  grace_epoch: number,
}

type PGFSteward = {
  PGFSteward: [
    {
      Add?: string,
      Remove?: string
    }
  ]
}

type Default = {
  Default: null
}

type ProposalsList = {
  proposals: ProposalInfo[],
}

type ProposalResult = {
  result: string,
  tally_type: string,
  total_voting_power: string,
  total_yay_power: string,
  total_nay_power: string,
  total_abstain_power: string,
}