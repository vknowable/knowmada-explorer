// type BlockResponse = {
//   block_id: string,
//   header: {
//     version: {
//       block: string,
//       app: string
//     },
//     chain_id: string,
//     height: string,
//     time: string,
//     last_block_id: {
//       hash: string,
//       parts: {
//         total: number,
//         hash: string
//       }
//     },
//     last_commit_hash: string,
//     data_hash: string,
//     validators_hash: string,
//     next_validators_hash: string,
//     consensus_hash: string,
//     app_hash: string,
//     last_results_hash: string,
//     evidence_hash: string,
//     proposer_address: string
//   },
//   last_commit: {
//     height: string,
//     round: string,
//     block_id: {
//       hash: string,
//       parts: {
//         total: 1,
//         hash: string
//       }
//     }
//   },
//   tx_hashes: TxSimple[],
//   epoch: number | null,
// }

type BlockResponse = {
  id: string,
  height: number,
  epoch: number,
  time: string,
  proposerAddress: string,
  wrapperTxs: string[],
  innerTxs: string[],
  signatures: string[],
}

// type SignaturesResponse = {
//   block_id: string,
//   signatures: Signature[],
// }

// type Signature = {
//   validator_address: string,
// }