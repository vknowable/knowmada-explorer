import Link from "next/link"

interface NavbarProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = () => {

  const baseStyle = "bg-black/30 transition-[margin-left] ease-in-out duration-500 z-10 min-h-screen h-full pt-4 border-r-2 pr-2"

  interface MenuItemProps {
    name: string;
    route: string;
    icon: string;
  }

  // Clickable menu items
  const MenuItem: React.FC<MenuItemProps> = ({ name, route, icon }) => {
    // strange issue where icons 7 and 8 not loading consistently prompted this workaround
    let bgIcon = `bg-nam0${icon}`
    if (parseInt(icon) == 7) bgIcon = "bg-nam07"
    else if (parseInt(icon) == 8) bgIcon = "bg-nam08"


    return (
      <Link
        href={route}
        className="flex gap-2 [&>*]:my-auto text-[15px] text-gray-200 font-bold group transition-all p-2.5 mt-3 items-center rounded-sm px-4 duration-300 cursor-pointer hover:bg-zinc-800/50 hover:text-[#FF0]"
      >
        <div className="flex justify-start items-center"><div className={`min-h-5 min-w-5 ${bgIcon} opacity-60 mr-1`}></div>{name}</div>
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
            icon="1"
          />
          <MenuItem
            name="Blocks"
            route="/blocks"
            icon="2"
          />
          <MenuItem
            name="Validators"
            route="/validators"
            icon="3"
          />
          <MenuItem
            name="Transactions"
            route="/transactions"
            icon="4"
          />
          <MenuItem
            name="Governance"
            route="/governance"
            icon="5"
          />
          <MenuItem
            name="Shielded Assets"
            route="/shielded"
            icon="6"
          />
          <MenuItem
            name="Public Goods Funding"
            route="/pgf"
            icon="7"
          />
          <MenuItem
            name="Chain Parameters"
            route="/parameters"
            icon="8"
          />
        </div>
      </div>
    </>
  )
}

export default Navbar