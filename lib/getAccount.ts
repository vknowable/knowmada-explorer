// export async function getAccount(address: string) {
//   const url = process.env.NEXT_PUBLIC_API_URL
//   const response = await fetch(`${url}/account/${address}/info`)
//   return response.json()
// }

export async function getAccount(address: string) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/api/v1/account/${address}`)
  return response.json()
}