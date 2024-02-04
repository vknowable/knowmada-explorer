import Searchbar from "./Searchbar";
import Image from "next/image";

type Props = {
  chainId: string,
}

export default function Header({ chainId }: Props) {
  
  return (
    <nav className="bg-slate-600 p-4 drop-shadow-xl z-10">
      <div className="flex justify-between items-end gap-14">
        <Image className="h-auto"
          src="/assets/namada-logo-splash.png"
          width={300}
          height={200}
          priority={true}
          alt="Namada logo"
        />
        <div className="w-full">
          <Searchbar />
        </div>
        <div className="text-sm">
          Chain-id: {chainId}
        </div>
      </div>
    </nav>
  )
}
