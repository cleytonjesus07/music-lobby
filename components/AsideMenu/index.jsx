import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc"
import { FaPlay } from "react-icons/fa"
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { songCtx } from "../../Context/SongContext";
import { appCtx } from "../../Context/AppContext";



export default function AsideMenu() {
   
    const { page: { setPage }, translate } = useContext(appCtx);
    const [whoMenuIsActive, setWhoMenuIsActive] = useState(null);
    const { asideMenu: { openMenu, setOpenMenu } } = useContext(songCtx);


    const menus = [
        {
            id: 0,
            icon: <AiFillHome className="w-full h-full" />,
            title: translate.asideMenu.home,
            href: "inicio"
        },
        {
            id: 1,
            icon: <AiOutlineSearch className="w-full h-full" />,
            title: translate.asideMenu.search,
            href: "pesquisar"
        }
    ]



    function handleActiveMenu(menu) {
        setWhoMenuIsActive({ active: menu });
        return;
    }

    useEffect(() => handleActiveMenu('Início'), [])

    return (
        <>
            {/* Menu Lateral */}
            <div className={`h-full w-56 bg-black fixed max-md:w-full max-md:z-10  max-md:flex max-md:flex-col max-md:fixed ${openMenu ? "" : "max-md:hidden"}`} style={{ zIndex: 999 }}>
                <button onClick={() => {
                    setOpenMenu(false)
                }} className="absolute right-10 top-9 md:hidden">
                    <VscChromeClose className="w-7 h-7 opacity-70 hover:opacity-100" />
                </button>
                <Link href={"/"} className="flex items-center  my-14 mx-4  ">
                    <FaPlay className="  w-6 h-auto mx-2" />
                    <span className="text-lg font-extrabold ">Music Lobby</span>
                </Link>
                <div>
                    <ul className="max-md:flex max-md:flex-col   ">
                        {menus.map(({  icon, title, href }, index) => {
                            return (
                                <li key={index} className="flex max-md:justify-center  ">
                                    <Link href={{ href }}
                                        
                                        onClick={() => {
                                            setPage(href.toLowerCase())
                                            setOpenMenu(false)
                                        }}
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
                    <span className="font-thin text-[.7em]">{translate.asideMenu.aboutProject}</span>
                    <span className="font-thin text-[.7em]" >{translate.asideMenu.developer}</span>
                </div>
            </div>
        </>
    )
}