'use client'

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { validateAddress, validateHash, validateHeight } from "@/lib/helpers"
import { getBlockByHash } from "@/lib/getBlock"

export default function Searchbar() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchTerm = search
    setSearch('')

    // check if valid address
    if (validateAddress(searchTerm)) {
      // TODO: check if validator address, token address or user address
      // or handle in the page itself?
      router.push(`/accounts/${searchTerm}`)
    }
    else if (validateHash(searchTerm)) {
      // TODO: check if block hash, else assume tx hash
      // need to resolve CORS error from client component
      // const blockData: Promise<BlockResponse> = getBlockByHash(searchTerm)
      // const block = await blockData
      // if (block !== null) {
      //   router.push(`/blocks/${searchTerm}`)
      // }
      // else {
      //   router.push(`/transactions/${searchTerm}`)
      // }
      router.push(`/transactions/${searchTerm}`)
    }
    else if (validateHeight(searchTerm)) {
      router.push(`/blocks/${search}/`)
    }
    else {
      // TODO: do a proper invalid input tooltip instead of this
      setSearch('Invalid input!')
    }
  }

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} pattern="[a-zA-Z0-9]+" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for validator / tx hash / block height / address" required />
        </div>
        {/* <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
        </button> */}
    </form>
  )
}
