type Props = {
  params: {
    address: string
  }
}

export default async function page({ params: { address } }: Props) {

  return (
    <div>addr: {address}
      <h1>Account Details</h1>
      <div>Address: tnam...</div>

      <div>Balance:</div>
      <div>Token | amount</div>
      <div>native | 100</div>
      <div>tnam... | 23</div>
      <div>tnam... | 54</div>
    </div>
  )
}