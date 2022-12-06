import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc"
import { VscLibrary } from "react-icons/vsc";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { songCtx } from "../../Context/SongContext";
import { appCtx } from "../../Context/AppContext";



export default function AsideMenu() {
    const { page: { setPage } } = useContext(appCtx);
    const [whoMenuIsActive, setWhoMenuIsActive] = useState(null);
    const { asideMenu: { openMenu, setOpenMenu } } = useContext(songCtx);
    const { scroll: { lockScroll } } = useContext(appCtx);

    const menus = [
        {
            id: 0,
            icon: <AiFillHome className="w-full h-full" />,
            title: "Início",
            href: "/"
        },
        {
            id: 1,
            icon: <AiOutlineSearch className="w-full h-full" />,
            title: "Pesquisar",
            href: "/"
        },
        {
            id: 2,
            icon: <VscLibrary className="w-full h-full" />,
            title: "Biblioteca",
            href: "/"
        },
    ]

    useEffect(() => {
        openMenu ? lockScroll(true) : lockScroll(false);
    }, [openMenu])

    function handleActiveMenu(menu) {
        setWhoMenuIsActive({ active: menu });
        return;
    }

    useEffect(() => handleActiveMenu('Início'), [])

    return (
        <>
            {/* Menu Lateral */}
            <div className={`h-full w-56 bg-black fixed max-md:w-full max-md:z-10  max-md:flex max-md:flex-col max-md:fixed ${openMenu ? "" : "max-md:hidden"}`}>
                <button onClick={() => {
                    setOpenMenu(false)
                }} className="absolute right-10 top-9 md:hidden">
                    <VscChromeClose className="w-7 h-7 opacity-70 hover:opacity-100" />
                </button>
                <Link href={"/"} className="flex items-center justify-start ml-5 ">
                    <div className="bg-no-repeat bg-contain bg-center w-16 h-14 my-5 flex items-center" style={{ backgroundImage: "url(/images/logo.png)" }}>
                    </div>
                    <span className="text-lg font-extrabold ">Music Lobby</span>
                </Link>
                <div>
                    <ul className="max-md:flex max-md:flex-col  ">
                        {menus.map(({ id, icon, title, href }, index) => {
                            return (
                                <li key={index} className="flex max-md:justify-center  ">
                                    <Link href={href}
                                        onClick={() => setPage(title.toLowerCase())}
                                        className={
                                            `
                                        flex 
                                        items-center 
                                        group 
                                        max-md:inline-flex
                                        max-md:items-center
                                        max-md:w-[200px]
                                        my-3
                                       
                                        `
                                        }>
                                        <div className="w-7 mx-5 py-2 opacity-70">{icon}</div>
                                        <div
                                            onClick={() => handleActiveMenu(title)}
                                            className={`
                                            font-semibold 
                                            text-sm 
                                            opacity-70 
                                            ${(whoMenuIsActive?.active === title) ? "opacity-100" : ""}
                                            transition-all
                                        `}
                                        >{title}</div>
                                    </Link>
                                </li>

                            )
                        })}

                    </ul>
                </div>
                <div className="absolute bottom-10 text-center w-full flex flex-col">
                    <span className="font-thin text-[.7em]">Projeto em desenvolvimento apenas para estudo.</span>
                    <span className="font-thin text-[.7em]" >Desenvolvido por <span className="font-bold">Cleyton Jesus</span></span>
                </div>
            </div>
        </>
    )
}