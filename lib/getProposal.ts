export async function getAllProposals() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/proposals/list`)
  return response.json()
}

export async function getProposal(id: number) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/proposals/${id}/info`)
  return response.json()
}

export async function getProposalResult(id: number) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/proposals/${id}/result`)
  return response.json()
}