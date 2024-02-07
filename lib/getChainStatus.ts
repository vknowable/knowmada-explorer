export async function getChainStatus() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/chain/status`)
  return response.json()
}

export async function getLastEpoch() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/chain/epoch/last`)
  return response.json()
}