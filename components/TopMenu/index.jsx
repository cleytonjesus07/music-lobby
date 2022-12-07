import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useContext, useDeferredValue } from "react";
import { songCtx } from "../../Context/SongContext";
import { appCtx } from "../../Context/AppContext";
export default function TopMenu() {
    const { page: { page, setPage }, search: { search, handleOnChange } } = useContext(appCtx)
    const { asideMenu: { setOpenMenu } } = useContext(songCtx);

    return (
        <header className="w-[calc(100%-w-56)] ml-56 max-md:ml-0 h-16 bg-black bg-opacity-70 flex items-center">
            <div className="w-32 mr-5  items-center justify-center hidden ">
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
            <button type={"button"} onClick={() => setOpenMenu(true)} className="ml-10 mr-5 flex items-center justify-center md:hidden rounded-full hover:bg-white group transition-all p-2 ">
                {/* Menu Hamburguer */}
                <GiHamburgerMenu className="w-5 h-5 group-hover:fill-black" />
            </button>
            <div>
                {/* SearchBox */}
                {page === "pesquisar" && (
                    <div className="relative flex items-center mx-2">
                        <div className="absolute w-7 mx-2 pointer-events-none">
                            <AiOutlineSearch className="fill-black w-full h-full " />
                        </div>
                        <input type={"search"} value={search} onChange={handleOnChange} placeholder="O que você quer ouvir?" className="py-2 px-10 w-[100%] rounded-full placeholder:font-light placeholder:text-sm  text-black outline-none " />
                    </div>
                )}
            </div>
            {/* <div className="absolute right-8">
                <Link href={"#"}>
                    <button type={"button"} className="bg-white text-black font-semibold py-2 px-7 rounded-full">
                        Entrar
                    </button>
                </Link>
            </div> */}
        </header>
    )
}