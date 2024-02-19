import { getChainParams } from "@/lib/getParams"
import { truncateHash, NATIVE_SCALE } from "@/lib/helpers"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import InfoRow from "@/app/components/InfoRow"

export default async function Parameters() {

  const chainParamsData: Promise<ChainParams> = getChainParams()
  const chainParams = await chainParamsData

  const vpAllowListTrunc = chainParams.protocol_params.vp_allowlist.map(hash => truncateHash(hash, 8, 8))
  const txAllowListTrunc = chainParams.protocol_params.tx_allowlist.map(hash => truncateHash(hash, 8, 8))

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Protocol:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <InfoRow a="Min epoch duration:" b={chainParams.protocol_params.min_epoch_dur.toString()} align="text-right" />
              <InfoRow a="Min blocks / epoch:" b={chainParams.protocol_params.min_blocks_epoch.toString()} align="text-right" />
              <InfoRow a="Max expected block duration:" b={chainParams.protocol_params.max_block_dur.toString()} align="text-right" />
              {/* <InfoRow a="VP allowlist:" b={vpAllowListString} align="text-right" />
              <InfoRow a="Tx allowlist:" b={txAllowListString} align="text-right" /> */}
              <TableRow>
                <TableCell>VP allowlist:</TableCell>
                <TableCell className="text-right">{vpAllowListTrunc.map(vp => (<div key={vp}>{vp}<br></br></div>))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tx allowlist:</TableCell>
                <TableCell className="text-right">{txAllowListTrunc.map(vp => (<div key={vp}>{vp}<br></br></div>))}</TableCell>
              </TableRow>
              <InfoRow a="Max block gas:" b={chainParams.protocol_params.max_block_gas.toString()} align="text-right" />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Proof of Stake:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <InfoRow a="Block proposer reward:" b={chainParams.pos_params.owned.block_proposer_reward} align="text-right" />
              <InfoRow a="Block vote reward:" b={chainParams.pos_params.owned.block_vote_reward} align="text-right" />
              <InfoRow a="Double-sign slash rate:" b={chainParams.pos_params.owned.duplicate_vote_min_slash_rate} align="text-right" />
              <InfoRow a="Light client attack slash rate:" b={chainParams.pos_params.owned.light_client_attack_min_slash_rate} align="text-right" />
              <InfoRow a="Cubic slashing window length:" b={chainParams.pos_params.owned.cubic_slashing_window_length.toString()} align="text-right" />
              <InfoRow a="Validator stake threshold:" b={(parseInt(chainParams.pos_params.owned.validator_stake_threshold)/NATIVE_SCALE).toString()} align="text-right" />
              <InfoRow a="Liveness window check:" b={chainParams.pos_params.owned.liveness_window_check.toString()} align="text-right" />
              <InfoRow a="Liveness threshold:" b={chainParams.pos_params.owned.liveness_threshold} align="text-right" />
              <InfoRow a="Rewards gain P:" b={chainParams.pos_params.owned.rewards_gain_p} align="text-right" />
              <InfoRow a="Rewards gain D:" b={chainParams.pos_params.owned.rewards_gain_d} align="text-right" />
              <InfoRow a="Max inflation rate:" b={chainParams.pos_params.owned.max_inflation_rate} align="text-right" />
              <InfoRow a="Target staked ratio:" b={chainParams.pos_params.owned.target_staked_ratio} align="text-right" />
              <InfoRow a="Max validator slots:" b={chainParams.pos_params.owned.max_validator_slots.toString()} align="text-right" />
              <InfoRow a="Pipeline length (epochs):" b={chainParams.pos_params.owned.pipeline_len.toString()} align="text-right" />
              <InfoRow a="Unbonding length (epochs):" b={chainParams.pos_params.owned.unbonding_len.toString()} align="text-right" />
              <InfoRow a="Votes per token:" b={chainParams.pos_params.owned.tm_votes_per_token} align="text-right" />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Governance:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <InfoRow a="Proposal deposit:" b={(parseInt(chainParams.gov_params.min_proposal_fund)/NATIVE_SCALE).toString()} align="text-right" />
              <InfoRow a="Max proposal code size:" b={chainParams.gov_params.max_proposal_code_size.toString()} align="text-right" />
              <InfoRow a="Max proposal content size:" b={chainParams.gov_params.max_proposal_content_size.toString()} align="text-right" />
              <InfoRow a="Min voting period (epochs):" b={chainParams.gov_params.min_proposal_voting_period.toString()} align="text-right" />
              <InfoRow a="Max voting period (epochs):" b={chainParams.pos_params.max_proposal_period.toString()} align="text-right" />
              <InfoRow a="Min grace period (epochs):" b={chainParams.gov_params.min_proposal_grace_epochs.toString()} align="text-right" />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Public Goods Funding:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <InfoRow a="PGF inflation rate:" b={chainParams.pgf_params.pgf_inflation_rate} align="text-right" />
              <InfoRow a="Steward inflation rate:" b={chainParams.pgf_params.stewards_inflation_rate} align="text-right" />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}
