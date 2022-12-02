import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import Link from "next/link";

const menus = [
    {
        icon: <AiFillHome className="w-full h-full" />,
        title: "Início",
        href: "/"
    },
    {
        icon: <AiOutlineSearch className="w-full h-full" />,
        title: "Pesquisar",
        href: "search"
    },
    {
        icon: <VscLibrary className="w-full h-full" />,
        title: "Biblioteca",
        href: "collection"
    },
]

export default function AsideMenu() {
    return (
        <>
            {/* Menu Lateral */}
            <div className='h-full w-56 bg-black fixed'>
                <Link href={"/"}>
                    <div className="bg-no-repeat bg-[20px] bg-contain w-full h-[50px] my-5 flex items-center justify-end" style={{ backgroundImage: "url(/images/logo.png)" }}>
                        <span className="text-lg font-extrabold mx-5">Music Lobby</span>
                    </div>
                </Link>
                <div>
                    <ul>
                        {menus.map(({ icon, title, href }, index) => {
                            return (
                                <li key={index}>
                                    <Link href={href} className="w-full flex items-center group">
                                        <div className="w-7 mx-5 py-2 opacity-70">{icon}</div>
                                        <div className="font-semibold text-sm opacity-70 group-hover:opacity-100 transition-all">{title}</div>
                                    </Link>
                                </li>

                            )
                        })}

                    </ul>
                </div>
            </div>
        </>
    )
}