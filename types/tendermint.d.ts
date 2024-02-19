type TendermintStatus = {
  jsonrpc: string,
  id: number,
  result: {
    node_info: {
      protocol_version: {
        p2p: string,
        block: string1,
        app: string
      },
      id: string,
      listen_addr: string,
      network: string,
      version: string,
      channels: string,
      moniker: string,
      other: {
        tx_index: string,
        rpc_address: string
      }
    },
    sync_info: {
      latest_block_hash: string,
      latest_app_hash: string,
      latest_block_height: string,
      latest_block_time: string,
      earliest_block_hash: string,
      earliest_app_hash: string,
      earliest_block_height: string,
      earliest_block_time: string,
      catching_up: boolean
    },
    validator_info: {
      address: string,
      pub_key: {
        type: string,
        value: string
      },
      voting_power: string
    }
  }
}

// type TendermintBlockResponse = {
//   jsonrpc: string,
//   id: number,
//   result: {
//     block_id: {
//       hash: string,
//       parts: {
//         total: number,
//         hash: string
//       }
//     },
//     block: {
//       header: {
//         version: {
//           block: string
//         },
//         chain_id: string,
//         height: string,
//         time: string,
//         last_block_id: {
//           hash: string,
//           parts: {
//             total: number,
//             hash: string
//           }
//         },
//         last_commit_hash: string,
//         data_hash: string,
//         validators_hash: string,
//         next_validators_hash: string,
//         consensus_hash: string,
//         app_hash: string,
//         last_results_hash: string,
//         evidence_hash: string,
//         proposer_address: string
//       },
//       data: {
//         txs: string[]
//       },
//       evidence: {
//         evidence: string[]
//       },
//       last_commit: {
//         height: string,
//         round: number,
//         block_id: {
//           hash: string,
//           parts: {
//             total: number,
//             hash: string
//           }
//         },
//         signatures: Signature[]
//       }
//     }
//   }
// }

// type Signature = {
//   block_id_flag: number,
//   validator_address: string,
//   timestamp: string,
//   signature: string
// }