// export async function getTransaction(hash: string) {
//   const url = process.env.NEXT_PUBLIC_API_URL
//   const response = await fetch(`${url}/tx/${hash}`)
//   return response.json()
// }

export async function getTransaction(hash: string) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/api/v1/chain/inner/${hash}`)
  return response.json()
}

export async function getAllShielded() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/tx/shielded`)
  return response.json()
}