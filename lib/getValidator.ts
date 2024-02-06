// looks up a validator by tendermint address
export async function getValidatorInfo(tm_address: string) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/validator/${tm_address}/info`)
  return response.json()
}

// looks up a validator's uptime by tendermint address
export async function getValidatorUptime(tm_address: string) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/validator/${tm_address}/uptime`)
  return response.json()
}

// export async function getTendermintValidators(page: string, per_page: string) {
//   const url = process.env.NEXT_PUBLIC_RPC_URL
//   const response = await fetch(`${url}/validators?page=${page}&per_page=${per_page}`)
//   return response.json()
// }

// gets all consensus validators and associated info
export async function getConsensusVals() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/validator/set`)
  return response.json()
}