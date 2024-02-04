type Props = {
  params: {
    proposalId: string
  }
}

export default async function page({ params: { proposalId } }: Props) {

  return (
    <div>proposal: {proposalId}
      <div>
        <div>Id | Title | Status</div>
        <div>Type: Default</div>
        <div>Start Epoch:</div>
        <div>End Epoch:</div>
        <div>Grace Epoch:</div>
        <div>Description</div>
        <div>Summary:</div>

        <div>Tally:</div>
        <div>Voted / Total</div>
        <div>Yes 23424 (44%)</div>
        <div>No 232424 (56%)</div>
        <div>Needed to pass: 66% yes, 1/3 total voting</div>

        <div>Votes</div>
        <div>Voter | Vote</div>
        <div>tnam.... yay</div>
        <div>tnam.... yay</div>
        <div>tnam.... yay</div>
        <div>tnam.... yay</div>
      </div>
    </div>
  )
}