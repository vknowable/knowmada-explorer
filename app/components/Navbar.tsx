import Link from "next/link"

interface NavbarProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = () => {

  const baseStyle = "bg-black/30 transition-[margin-left] ease-in-out duration-500 z-10 min-h-screen h-full pt-4 border-r-2"

  interface MenuItemProps {
    name: string;
    route: string;
  }

  // Clickable menu items
  const MenuItem: React.FC<MenuItemProps> = ({ name, route }) => {

    return (
      <Link
        href={route}
        className="flex gap-1 [&>*]:my-auto text-[15px] text-gray-200 font-bold group transition-all p-2.5 mt-3 items-center rounded-sm px-4 duration-300 cursor-pointer hover:bg-white/20 hover:text-[#FF0]"
      >
        <div className="flex justify-start items-center"><div className="min-h-5 min-w-5 bg-nam01 opacity-60"></div>{name}</div>
      </Link>
    )
  }

  return (
    <>
      <div className={baseStyle}>

        <div className="flex flex-col">
          <MenuItem
            name="Dashboard"
            route="/"
          />
          <MenuItem
            name="Blocks"
            route="/blocks"
          />
          <MenuItem
            name="Validators"
            route="/validators"
          />
          <MenuItem
            name="Transactions"
            route="/transactions"
          />
          <MenuItem
            name="Governance"
            route="/governance"
          />
          <MenuItem
            name="Shielded Assets"
            route="/shielded"
          />
          <MenuItem
            name="Public Goods Funding"
            route="/pgf"
          />
          <MenuItem
            name="Chain Parameters"
            route="/parameters"
          />
        </div>
      </div>
    </>
  )
}

export default Navbar