'use client'

import { useAtom } from "jotai"
import { chainParamsAtom } from "@/app/store/store"
import { truncateHash, NATIVE_SCALE } from "@/lib/helpers"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import InfoRow from "@/app/components/InfoRow"


export default function ChainParams() {

  const [{ data: paramsData, isPending: paramsPending, isError: paramsError }] = useAtom(chainParamsAtom)

  if (paramsPending) {
    return (
      <div className="grid place-items-center mb-12">
        <Card className="w-[50%] mt-8">
          <CardContent className="grid place-items-center">
            <div className="pt-8">Checking...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const vpAllowListTrunc = paramsData.protocol_params.vp_allowlist.map((hash: string) => truncateHash(hash, 8, 8))
  const txAllowListTrunc = paramsData.protocol_params.tx_allowlist.map((hash: string) => truncateHash(hash, 8, 8))

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[50%] mt-8">
        <CardHeader>
          <CardTitle>Protocol:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <InfoRow a="Min epoch duration:" b={paramsData.protocol_params.min_epoch_dur.toString()} align="text-right" />
              <InfoRow a="Min blocks / epoch:" b={paramsData.protocol_params.min_blocks_epoch.toString()} align="text-right" />
              <InfoRow a="Max expected block duration:" b={paramsData.protocol_params.max_block_dur.toString()} align="text-right" />
              {/* <InfoRow a="VP allowlist:" b={vpAllowListString} align="text-right" />
              <InfoRow a="Tx allowlist:" b={txAllowListString} align="text-right" /> */}
              <TableRow>
                <TableCell>VP allowlist:</TableCell>
                <TableCell className="text-right text-zinc-300">{vpAllowListTrunc.map((vp: string) => (<div key={vp}>{vp}<br></br></div>))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tx allowlist:</TableCell>
                <TableCell className="text-right text-zinc-300">{txAllowListTrunc.map((vp: string) => (<div key={vp}>{vp}<br></br></div>))}</TableCell>
              </TableRow>
              <InfoRow a="Max block gas:" b={paramsData.protocol_params.max_block_gas.toString()} align="text-right" />
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
              <InfoRow a="Block proposer reward:" b={paramsData.pos_params.owned.block_proposer_reward} align="text-right" />
              <InfoRow a="Block vote reward:" b={paramsData.pos_params.owned.block_vote_reward} align="text-right" />
              <InfoRow a="Double-sign slash rate:" b={paramsData.pos_params.owned.duplicate_vote_min_slash_rate} align="text-right" />
              <InfoRow a="Light client attack slash rate:" b={paramsData.pos_params.owned.light_client_attack_min_slash_rate} align="text-right" />
              <InfoRow a="Cubic slashing window length:" b={paramsData.pos_params.owned.cubic_slashing_window_length.toString()} align="text-right" />
              <InfoRow a="Validator stake threshold:" b={(parseInt(paramsData.pos_params.owned.validator_stake_threshold)/NATIVE_SCALE).toString()} align="text-right" />
              <InfoRow a="Liveness window check:" b={paramsData.pos_params.owned.liveness_window_check.toString()} align="text-right" />
              <InfoRow a="Liveness threshold:" b={paramsData.pos_params.owned.liveness_threshold} align="text-right" />
              <InfoRow a="Rewards gain P:" b={paramsData.pos_params.owned.rewards_gain_p} align="text-right" />
              <InfoRow a="Rewards gain D:" b={paramsData.pos_params.owned.rewards_gain_d} align="text-right" />
              <InfoRow a="Max inflation rate:" b={paramsData.pos_params.owned.max_inflation_rate} align="text-right" />
              <InfoRow a="Target staked ratio:" b={paramsData.pos_params.owned.target_staked_ratio} align="text-right" />
              <InfoRow a="Max validator slots:" b={paramsData.pos_params.owned.max_validator_slots.toString()} align="text-right" />
              <InfoRow a="Pipeline length (epochs):" b={paramsData.pos_params.owned.pipeline_len.toString()} align="text-right" />
              <InfoRow a="Unbonding length (epochs):" b={paramsData.pos_params.owned.unbonding_len.toString()} align="text-right" />
              <InfoRow a="Votes per token:" b={paramsData.pos_params.owned.tm_votes_per_token} align="text-right" />
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
              <InfoRow a="Proposal deposit:" b={(parseInt(paramsData.gov_params.min_proposal_fund)/NATIVE_SCALE).toString()} align="text-right" />
              <InfoRow a="Max proposal code size:" b={paramsData.gov_params.max_proposal_code_size.toString()} align="text-right" />
              <InfoRow a="Max proposal content size:" b={paramsData.gov_params.max_proposal_content_size.toString()} align="text-right" />
              <InfoRow a="Min voting period (epochs):" b={paramsData.gov_params.min_proposal_voting_period.toString()} align="text-right" />
              <InfoRow a="Max voting period (epochs):" b={paramsData.pos_params.max_proposal_period.toString()} align="text-right" />
              <InfoRow a="Min grace period (epochs):" b={paramsData.gov_params.min_proposal_grace_epochs.toString()} align="text-right" />
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
              <InfoRow a="PGF inflation rate:" b={paramsData.pgf_params.pgf_inflation_rate} align="text-right" />
              <InfoRow a="Steward inflation rate:" b={paramsData.pgf_params.stewards_inflation_rate} align="text-right" />
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}