export async function getChainParams() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/chain/params`)
  return response.json()
}