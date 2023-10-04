import Link from "next/link";
import { AiOutlineSketch } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { BsPersonGear } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";

export default function Sidebar({ children }) {
  return (
    <div className="flex">
      <div className="fixed w-20  h-screen bg-white border-r-[1px] flex flex-col justify-between py-3 px-2">
        <div className="flex flex-col items-center">
          <Link href={"/"}>
            <div className="bg-purple-800 text-white p-3 rounded-lg inline-block mb-2">
              <AiOutlineSketch size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full"></span>
          <Link href={"/"}>
            <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 p-3 rounded-lg inline-block my-3">
              <RxDashboard size={20} />
            </div>
          </Link>
          <Link href={"/profil"}>
            <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 p-3 rounded-lg inline-block my-3">
              <BsPersonGear size={20} />
            </div>
          </Link>
          <Link href={"/product_list"}>
            <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 p-3 rounded-lg inline-block my-3">
              <GrSettingsOption size={20} />
            </div>
          </Link>
          <Link href={"/vente"}>
            <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 p-3 rounded-lg inline-block my-3">
              <HiShoppingCart size={20} />
            </div>
          </Link>
          <Link href={"/historique"}>
            <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 p-3 rounded-lg inline-block my-3">
              <FaHistory size={20} />
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full ml-20">{children}</div>
    </div>
  );
}
