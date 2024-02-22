import LatestBlocks from "../components/LatestBlocks";

export default async function Blocks() {

  return (
    <div className="grid min-h-screen place-items-center p-10 ml-4">
      <LatestBlocks fullView={true} />
    </div>
  )
}
