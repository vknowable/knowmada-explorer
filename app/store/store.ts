import { atom } from "jotai"
import { atomWithQuery, atomWithInfiniteQuery } from "jotai-tanstack-query"
import axios from "axios"

////////////////// block atoms

export const BLOCKS_PER_PAGE = 10
export const blockChainResponseAtom = atomWithInfiniteQuery(() => ({
  queryKey: ['blockChain',],
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/block/last?num=${BLOCKS_PER_PAGE}&&offset=${(pageParam-1)*BLOCKS_PER_PAGE}`)
      return response.data
    } catch {
      throw new Error("failed to fetch last 10 blocks data")
    }
  },
  getNextPageParam: (lastPage: BlockResponse[], allPages, lastPageParam) => {
    const lastElement = lastPage.slice(-1)[0]
    if (lastElement == undefined || lastElement == null) {
      return undefined
    } 
    return parseInt(lastElement.header.height) > 0 ? lastPageParam + 1 : undefined
  },
  // getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => firstPageParam + 1,
  initialPageParam: 1,
  networkMode: 'offlineFirst',
  maxPages: 25,
  refetchInterval: 10000,
}))



////////////////// validator atoms
// TODO: fetch based on height; backend would need to be updated
// consensus set
export const VALS_PER_PAGE = 20
export const consensusSetResponseAtom = atomWithInfiniteQuery(() => ({
  queryKey: ['setAtHeight',],
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/validator/set?page=${pageParam}&&per_page=${VALS_PER_PAGE}`)
      return response.data
    } catch {
      throw new Error("failed to fetch validator set data")
    }
  },
  getNextPageParam: (lastPage: ConsensusSetResponse, allPages, lastPageParam) => {
    return (lastPage.pagination.page * lastPage.pagination.per_page) < lastPage.pagination.total ? lastPageParam + 1 : undefined
  },
  // getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => firstPageParam + 1,
  initialPageParam: 1,
}))

// validator info
export const valAddrAtom = atom<string>("")
export const validatorInfoAtom = atomWithQuery((get) => {
  const valAddr = get(valAddrAtom)
  return {
    enabled: !!valAddr,
    queryKey: ["valInfo", valAddr],
    queryFn: async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${url}/validator/${valAddr}/info`)
        return response.data
      } catch {
        throw new Error("failed to fetch validator info data")
      }
    },
  }
})


////////////////// chain status atoms
export const chainStatusAtom = atomWithQuery(() => ({
  queryKey: ['statusAtHeight',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/chain/status`)
      return response.data
    } catch {
      throw new Error("failed to fetch chain status data")
    }
  },
  refetchInterval: 300000,
}))



////////////////// proposal atoms
export const allProposalsAtom = atomWithQuery(() => ({
  queryKey: ['allProposals',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/proposals/list`)
      return response.data
    } catch {
      throw new Error("failed to fetch list of proposals data")
    }
  },
  // refetchInterval: 300000,
}))

export const proposalIdAtom = atom<number>(0)

export const proposalInfoAtom = atomWithQuery((get) => {
  const proposalId = get(proposalIdAtom)
  return {
    enabled: !!proposalId,
    queryKey: ["proposalInfo", proposalId],
    queryFn: async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${url}/proposals/${proposalId}/info`)
        return response.data
      } catch {
        throw new Error("failed to fetch proposal info data")
      }
    },
  }
})

export const proposalResultAtom = atomWithQuery((get) => {
  const proposalId = get(proposalIdAtom)
  return {
    enabled: !!proposalId,
    queryKey: ["proposalResult", proposalId],
    queryFn: async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${url}/proposals/${proposalId}/result`)
        return response.data
      } catch {
        throw new Error("failed to fetch proposal result data")
      }
    },
  }
})



////////////////// params atoms
export const chainParamsAtom = atomWithQuery(() => ({
  queryKey: ['chainParams',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/chain/params`)
      return response.data
    } catch {
      throw new Error("failed to fetch chain params data")
    }
  },
  // refetchInterval: 300000,
}))



////////////////// shielded assets atoms
export const shieldedListAtom = atomWithQuery(() => ({
  queryKey: ['shieldedList',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/tx/shielded`)
      return response.data
    } catch {
      throw new Error("failed to fetch list of shielded assets data")
    }
  },
  // refetchInterval: 300000,
}))