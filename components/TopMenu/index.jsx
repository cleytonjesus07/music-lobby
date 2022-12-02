import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
export default function TopMenu() {
    return (
        <div className="w-[calc(100%-w-56)] ml-56 h-16 bg-black bg-opacity-70 flex items-center">
            <div className="w-32 mr-5 flex items-center justify-center ">
                <button className="bg-black p-2 rounded-full mx-5 opacity-70 hover:opacity-100 transition-all">
                    <FaChevronLeft />
                </button>
                <button className="bg-black p-2 rounded-full
                opacity-70 hover:opacity-100 transition-all">
                    <FaChevronRight />
                </button>
            </div>
            <div>
                {/* SearchBox */}
                <div className="relative flex items-center">
                    <div className="absolute w-7 mx-2 pointer-events-none">
                        <AiOutlineSearch className="fill-black w-full h-full " />
                    </div>
                    <input type={"search"} placeholder="O que você quer ouvir?" className="p-2 rounded-full placeholder:font-light placeholder:text-sm w-[300px] text-black outline-none px-10" />
                </div>
            </div>
            <div className="absolute right-8">
                <Link href={"#"}>
                    <button className="bg-white text-black font-semibold py-2 px-7 rounded-full">
                        Entrar
                    </button>
                </Link>
            </div>
        </div>
    )
}