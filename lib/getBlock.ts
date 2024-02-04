export async function getLastBlock() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/block/last`)
  return response.json()
}

export async function getBlockAtHeight(height: number) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/block/height/${height}`)
  return response.json()
}

export async function getBlockByHash(hash: string) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/block/hash/${hash}`)
  return response.json()
}

export async function getTendermintBlockAtHeight(height: number) {
  const url = process.env.NEXT_PUBLIC_RPC_URL
  const response = await fetch(`${url}/block?height=${height}`)
  return response.json()
}