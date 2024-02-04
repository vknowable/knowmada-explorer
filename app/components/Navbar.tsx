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

  const baseStyle = "bg-black transition-[margin-left] ease-in-out duration-500 z-40 h-full"

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
        className="flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 text-white/70 hover:text-white"
      >
        {/* <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                  {icon}
              </div> */}
        <div>{name}</div>
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
        <div className="p-4 pt-10 mb-8 flex justify-center items-end gap-4 w-full">
          <Link href="/">
            {/*eslint-disable-next-line*/}
            {/* <img src="../assets/knowable-logo.png" alt="Knowable Logo" width={100} height={100} /> */}
            <Image className="rounded-md"
              src="/assets/knowable-logo.png"
              width={100}
              height={100}
              priority={true}
              alt="Knowable logo"
            />

          </Link>
          <div>
            <div className="text-white text-center text-lg">Knowmada Explorer</div>
            <div className="mt-2 text-white/50 text-center text-xs">by Knowable</div>
          </div>

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