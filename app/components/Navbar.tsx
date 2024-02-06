import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image";

interface NavbarProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

// const Navbar: React.FC<NavbarProps> = ({ show, setter }) => {
const Navbar = () => {
  // const router = useRouter()

  const baseStyle = "bg-black transition-[margin-left] ease-in-out duration-500 z-40 min-h-screen h-full"

  interface MenuItemProps {
    name: string;
    route: string;
  }

  // Clickable menu items
  const MenuItem: React.FC<MenuItemProps> = ({ name, route }) => {

    return (
      <Link
        href={route}
        // onClick={() => {
        //     setter((oldVal: boolean) => !oldVal);
        // }}
        className="flex gap-1 [&>*]:my-auto text-md pl-6 py-3 pt-6 border-b-[1px] border-b-light/20 hover:border-b-cyan text-yellow/60 hover:text-yellow group transition-all tracking-wide"
      >
        {/* <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                  {icon}
              </div> */}
        <div className="flex justify-start gap-4 items-end"><div className="bg-logo-symbol min-h-6 min-w-6 opacity-0 group-hover:opacity-90 transition-all"></div>{name}</div>
      </Link>
    )
  }

  // Overlay to prevent clicks in background, also serves as our close button
  // const ModalOverlay = () => (
  //   <div
  //       className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
  //       onClick={() => {
  //           setter((oldVal: boolean) => !oldVal);
  //       }}
  //   />
  // )

  return (
    <>
      <div className={baseStyle}>
        <div className="p-4 pb-8 mb-8 w-full border-b-2 border-light min-h-40 flex items-end">
          <Link href="/" className="flex flex-col items-start">
            <div className="flex justify-center gap-3 w-full">
              <div className="min-h-5 min-w-5 bg-nam01 animate-bounce animation-delay-300 opacity-60"></div>
              <div className="min-h-5 min-w-5 bg-nam02 animate-bounce animation-delay-600 opacity-60"></div>
              <div className="min-h-5 min-w-5 bg-nam03 animate-bounce animation-delay-400 opacity-60"></div>
              <div className="min-h-5 min-w-5 bg-nam04 animate-bounce animation-delay-150 opacity-60"></div>
              <div className="min-h-5 min-w-5 bg-nam05 animate-bounce animation-delay-500 opacity-60"></div>
              <div className="min-h-5 min-w-5 bg-nam06 animate-bounce animation-delay-200 opacity-60"></div>
            </div>
            <div className="mt-4 text-white text-center text-lg font-bold tracking-wide">Knowmada Explorer</div>
            <div className="text-center w-full text-white/50 text-center text-xs">by Knowable</div>
          </Link>

        </div>
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
      {/* {show ? <ModalOverlay /> : <></>} */}
    </>
  )
}

export default Navbar