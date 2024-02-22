import LatestTransactions from "../components/LatestTransactions";

export default function Transactions() {

  return (
    <div className="grid min-h-screen place-items-center p-10 ml-4">
      <LatestTransactions fullView={true} />
    </div>
  )
}
