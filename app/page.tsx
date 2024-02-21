import { getLastBlock, getBlockAtHeight } from "@/lib/getBlock";
import { truncateHash, timeAgo } from "@/lib/helpers";
import { getChainStatus } from "@/lib/getChainStatus";
import { getTransaction } from "@/lib/getTransaction";

import Link from "next/link";
import LatestBlock from "./components/LatestBlock";
import ActiveVals from "./components/ActiveVals";
import TokenSupply from "./components/TokenSupply";
import LatestBlocks from "./components/LatestBlocks";
import LatestTransactions from "./components/LatestTransactions";

export default async function Home() {

  return (
    <main className="grid grid-cols-[auto,auto] grid-rows-[auto,auto,auto,auto,auto] gap-8 p-10 min-h-screen place-items-start">


      <ActiveVals />
      <LatestBlock />
      <TokenSupply />
      <LatestBlocks fullView={false} />
      <LatestTransactions fullView={false} />


    </main>
  );
}
