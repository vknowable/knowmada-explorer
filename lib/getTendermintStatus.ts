export default async function getTendermintStatus() {
  const url = process.env.NEXT_PUBLIC_RPC_URL
  const response = await fetch(`${url}/status`)
  return response.json()
}