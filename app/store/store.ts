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
      const response = await axios.get(`${url}/api/v1/blocks/height/range?length=${BLOCKS_PER_PAGE}`)
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
    return lastElement.height > 0 ? lastPageParam + 1 : undefined
  },
  // getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => firstPageParam + 1,
  initialPageParam: 1,
  networkMode: 'offlineFirst',
  maxPages: 25,
  refetchInterval: 6000,
}))

export const latestBlockAtom = atomWithQuery(() => ({
  queryKey: ['latestBlock',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/api/v1/blocks/height/latest`)
      return response.data
    } catch {
      throw new Error("failed to fetch latest block data")
    }
  },
  refetchInterval: 300000,
}))



////////////////// validator atoms
// TODO: fetch based on height; backend would need to be updated
// validator set (paginated)
export const VALS_PER_PAGE = 30
export const consensusSetResponseAtom = atomWithInfiniteQuery(() => ({
  queryKey: ['setAtHeight',],
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/api/v1/pos/validator?page=${pageParam}&state=consensus`)
      return response.data
    } catch {
      throw new Error("failed to fetch validator set data")
    }
  },
  getNextPageParam: (lastPage: ValidatorSetResponse, allPages, lastPageParam) => {
    return (lastPage.pagination.page * lastPage.pagination.perPage) < lastPage.pagination.totalItems ? lastPageParam + 1 : undefined
  },
  // getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => firstPageParam + 1,
  initialPageParam: 1,
}))

// // validator info
export const valAddrAtom = atom<string>("")
// export const validatorInfoAtom = atomWithQuery((get) => {
//   const valAddr = get(valAddrAtom)
//   return {
//     enabled: !!valAddr,
//     queryKey: ["valInfo", valAddr],
//     queryFn: async () => {
//       try {
//         const url = process.env.NEXT_PUBLIC_API_URL
//         const response = await axios.get(`${url}/validator/${valAddr}/info`)
//         return response.data
//       } catch {
//         throw new Error("failed to fetch validator info data")
//       }
//     },
//   }
// })

// all validators (non paginated)
export const allValsAtom = atomWithQuery(() => ({
  queryKey: ['allVals',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/api/v1/pos/validator/all`)
      return response.data
    } catch {
      throw new Error("failed to fetch current all-validators data")
    }
  },
  refetchInterval: 300000,
}))


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

export const currentEpochAtom = atomWithQuery(() => ({
  queryKey: ['currentEpoch',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/api/v1/chain/epoch/latest`)
      return response.data
    } catch {
      throw new Error("failed to fetch current epoch data")
    }
  },
  refetchInterval: 300000,
}))

export const totalVPAtom = atomWithQuery(() => ({
  queryKey: ['totalVP',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/api/v1/pos/voting-power`)
      return response.data
    } catch {
      throw new Error("failed to fetch total voting power data")
    }
  },
  refetchInterval: 3000000,
}))


////////////////// proposal atoms
// export const allProposalsAtom = atomWithQuery(() => ({
//   queryKey: ['allProposals',],
//   queryFn: async () => {
//     try {
//       const url = process.env.NEXT_PUBLIC_API_URL
//       const response = await axios.get(`${url}/proposals/list`)
//       return response.data
//     } catch {
//       throw new Error("failed to fetch list of proposals data")
//     }
//   },
//   // refetchInterval: 300000,
// }))

export const allProposalsAtom = atomWithQuery(() => ({
  queryKey: ['allProposals',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/api/v1/gov/proposal/all`)
      return response.data
    } catch {
      throw new Error("failed to fetch list of all proposals data")
    }
  },
  // refetchInterval: 300000,
}))

// export const proposalIdAtom = atom<number>(0)
// 
// export const proposalInfoAtom = atomWithQuery((get) => {
//   const proposalId = get(proposalIdAtom)
//   return {
//     enabled: !!proposalId,
//     queryKey: ["proposalInfo", proposalId],
//     queryFn: async () => {
//       try {
//         const url = process.env.NEXT_PUBLIC_API_URL
//         const response = await axios.get(`${url}/proposals/${proposalId}/info`)
//         return response.data
//       } catch {
//         throw new Error("failed to fetch proposal info data")
//       }
//     },
//   }
// })

export const proposalIdAtom = atom<number>(0)

export const proposalInfoAtom = atomWithQuery((get) => {
  const proposalId = get(proposalIdAtom)
  return {
    enabled: proposalId >= 0,
    queryKey: ["proposalInfo", proposalId],
    queryFn: async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${url}/api/v1/gov/proposal/${proposalId}`)
        return response.data
      } catch {
        throw new Error("failed to fetch proposal info data")
      }
    },
  }
})

// export const proposalResultAtom = atomWithQuery((get) => {
//   const proposalId = get(proposalIdAtom)
//   return {
//     enabled: !!proposalId,
//     queryKey: ["proposalResult", proposalId],
//     queryFn: async () => {
//       try {
//         const url = process.env.NEXT_PUBLIC_API_URL
//         const response = await axios.get(`${url}/proposals/${proposalId}/result`)
//         return response.data
//       } catch {
//         throw new Error("failed to fetch proposal result data")
//       }
//     },
//   }
// })


// ////////////////// account atoms
// export const accountAtom = atom<string>("")

// export const accountBalanceAtom = atomWithQuery((get) => {
//   const accountAddress = get(accountAtom)
//   return {
//     enabled: accountAddress !== "",
//     queryKey: ["accountBalance", accountAddress],
//     queryFn: async () => {
//       try {
//         const url = process.env.NEXT_PUBLIC_API_URL
//         const response = await axios.get(`${url}/api/v1/account/${accountAddress}`)
//         return response.data
//       } catch {
//         throw new Error("failed to fetch account balance data")
//       }
//     },
//   }
// })




////////////////// params atoms
export const chainParamsAtom = atomWithQuery(() => ({
  queryKey: ['chainParams',],
  queryFn: async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${url}/api/v1/chain/parameters`)
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