export async function getTransaction(hash: string) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/tx/${hash}`)
  return response.json()
}