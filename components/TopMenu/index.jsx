import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useContext } from "react";
import { songCtx } from "../../Context/SongContext";
import { appCtx } from "../../Context/AppContext";
export default function TopMenu() {
    const { page: { page }, search: { search, setSearch } } = useContext(appCtx)
    const { asideMenu: { setOpenMenu } } = useContext(songCtx);
    return (
        <header className="w-[calc(100%-w-56)] ml-56 max-md:ml-0 h-16 bg-black bg-opacity-70 flex items-center">
            <div className="w-32 mr-5 flex items-center justify-center max-md:hidden ">
                <button type={"button"} className="bg-black p-2 rounded-full mx-5 opacity-70 hover:opacity-100 transition-all">
                    <FaChevronLeft />
                    <span className="hidden">{"<"}</span>
                </button>
                <button type={"button"} className="bg-black p-2 rounded-full
                opacity-70 hover:opacity-100 transition-all">
                    <FaChevronRight />
                    <span className="hidden">{"<"}</span>
                </button>
            </div>
            <button type={"button"} onClick={() => setOpenMenu(true)} className="ml-10 mr-5 flex items-center justify-center md:hidden rounded-full hover:bg-white group transition-all p-2">
                {/* Menu Hamburguer */}
                <GiHamburgerMenu className="w-5 h-5 group-hover:fill-black" />
            </button>
            <div className="max-sm:hidden">
                {/* SearchBox */}
                {page === "pesquisar" && (
                    <div className="relative flex items-center">
                        <div className="absolute w-7 mx-2 pointer-events-none">
                            <AiOutlineSearch className="fill-black w-full h-full " />
                        </div>
                        <input type={"search"} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="O que você quer ouvir?" className="p-2 px-10 rounded-full placeholder:font-light placeholder:text-sm  text-black outline-none max-sm:hidden" />
                    </div>
                )}
            </div>
            <div className="absolute right-8">
                <Link href={"#"}>
                    <button type={"button"} className="bg-white text-black font-semibold py-2 px-7 rounded-full">
                        Entrar
                    </button>
                </Link>
            </div>
        </header>
    )
}