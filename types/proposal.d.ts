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