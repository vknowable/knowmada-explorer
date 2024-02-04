type Props = {
  params: {
    valAddr: string
  }
}

export default async function page({ params: { valAddr } }: Props) {

  return (
    <div>val addr: {valAddr}
      <div>|logo| address</div>
      <div>description</div>
      <div>Website: link</div>
      <div>Status: Active | Commission: 5% | Condition: Good | Max Commission Rate: 20%</div>
      <div>Voting Power</div>
      <div>2.33% | 300 / total</div>
      <div>Last 100 Blocks</div>
      <div>blocks.....</div>
      <div>Bonds: | Unbondings:</div>
      <div>address amount</div>
      <div>address amount</div>
      <div>address amount</div>
    </div>
  )
}