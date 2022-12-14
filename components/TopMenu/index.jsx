import { AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useContext, useState, memo } from "react";
import { songCtx } from "../../Context/SongContext";
import { appCtx } from "../../Context/AppContext";
import { useRouter } from "next/router";
import Image from "next/image";
function TopMenu() {
    const router = useRouter();
    const locales = router.locales;
    const { page: { page }, search: { search, handleOnChange }, translate } = useContext(appCtx)
    const { asideMenu: { setOpenMenu } } = useContext(songCtx);
    const [flag, setFlag] = useState(router.locale);
    return (
        <header className="relative w-[calc(100%-w-56)] ml-56 max-md:ml-0 h-16 bg-black bg-opacity-70  flex items-center">
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
            <button type={"button"} title="Menu" onClick={() => setOpenMenu(true)} className="ml-10 mr-5 flex items-center justify-center md:hidden rounded-full hover:bg-white group transition-all p-2 ">
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
                        <input type={"search"} value={search} onChange={handleOnChange} placeholder={translate.searchScreen.searchInputPlaceholder} className="py-2 px-10 w-[100%] rounded-full placeholder:font-light placeholder:text-sm  text-black outline-none " />
                    </div>
                )}
            </div>
            <div className={`right-10  absolute flex items-center space-x-2  p-1 ${page === "pesquisar" && 'hidden'}`}>
                {flag && <Image src={`/images/${flag == "pt-BR" ? "brazil" : "eua"}.png`} width={35} height={35} alt="flag" />}
                <select defaultValue={router.locale} onChange={({ target }) => {
                    setFlag(target.value)
                    router.locale = target.value;
                    router.push("/", "/", { locale: target.value, shallow: true })
                }} className={`bg-neutral-900 border-white border-solid border-[1px] p-[2px] cursor-pointer`}>
                    {locales.map((local, i) => {
                        switch (local) {
                            case "pt-BR":
                                return <option key={i} value={local}>{router.locale == "pt-BR" ? "Portugu??s - BR" : "Portuguese - BR"}</option>
                            case "en-US":
                                return <option key={i} value={local}>{router.locale == "en-US" ? "English - US" : "Ingl??s - US"}</option>
                            default:
                                break;
                        }
                    })}
                </select>
            </div>
        </header>
    )
}

export default memo(TopMenu);